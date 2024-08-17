import React from 'react';

const ProductCard = ({ product }) => {

    const addToCart = (product) => {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        const cart = JSON.parse(localStorage.getItem('cart'));

        product.quantity = 1;

        if (cart.find(p => p.id === product.id)) {
            cart.find(p => p.id === product.id).quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <div className="col-md-4 col-6">
            <div className="card h-100">
                <img
                    src={process.env.REACT_APP_URL + product.image}
                    className="card-img-top"
                    alt={product.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.price} €</p>
                    <div className="btn btn-primary" onClick={() => {
                        addToCart(product);
                    }}>Ajouter</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;