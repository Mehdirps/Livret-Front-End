import React from 'react';

const ProductCard = ({ product }) => {
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
                    <a href={product.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Voir</a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;