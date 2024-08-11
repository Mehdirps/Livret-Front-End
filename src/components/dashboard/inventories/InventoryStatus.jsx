import React from 'react';
import { useSelector } from 'react-redux';

const InventoryStatus = ({ inventory }) => {
    const token = useSelector(state => state.user.token);

    const handleChange = (e) => {
        const value = e.target.value;

        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status: value,
                inventory_id: inventory.id
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <select
            name="status"
            className="form-control status"
            value={inventory.status}
            onChange={(e) => handleChange(e)}
        >
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
        </select>
    );
};

export default InventoryStatus;