import React from 'react';
import { useSelector } from 'react-redux';

const InventoryDelete = ({ id }) => {

    const token = useSelector(state => state.user.token);

    const handleDelete = () => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
                if (window.confirm('Voulez-vous vraiment supprimer cet état des lieux ?')) {
                    handleDelete();
                    e.target.closest('tr').remove();
                }
            }}
        >
            Supprimer
        </button>
    );
};

export default InventoryDelete;