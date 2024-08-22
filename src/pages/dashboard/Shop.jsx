import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../../stores/slices/livretSlice';
import ProductCard from '../../components/dashboard/shop/ProductCard';
import Loading from '../../components/Loading';

const Shop = () => {
    const token = useSelector(state => state.user.token);
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    }, [token, dispatch]);

    if(!categories) {
        return (
            <Loading />
        );
    }

    return (
        <div className="col-md-9 col-12">
            <h1>Notre boutique</h1>
            <p>Vous pouvez acheter des objets pour votre livret d'accueil.</p>
            <div className="row">
                {categories.map(category => (
                    category.products.length > 0 && (
                        <div className="col-12" key={category.id}>
                            <h2>{category.name}</h2>
                            <p>{category.description}</p>
                            <div className="row">
                                {
                                    category.products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Shop;
