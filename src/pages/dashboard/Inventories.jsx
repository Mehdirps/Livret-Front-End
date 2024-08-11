import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InventoriesSearchForm from '../../components/dashboard/inventories/InventoriesSearchForm';
import InventoriesTable from '../../components/dashboard/inventories/InventoriesTable';
import InventoriesFilter from '../../components/dashboard/inventories/InventoriesFilter';
import InventoriesExportPDF from '../../components/dashboard/inventories/InventoriesExportPDF';

const Inventories = () => {
    const token = useSelector(state => state.user.token);
    const [inventories, setInventories] = React.useState([]);
    const [filteredInventories, setFilteredInventories] = React.useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setInventories(data.inventories);
                setFilteredInventories(data.inventories);
            })
            .catch(err => console.log(err));
    }, [token]);


    return (
        <div className="container">
            <h2 className="mb-4">Etats de lieux</h2>
            <InventoriesSearchForm />
            <hr />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInventoryModal">
                Ajouter un état des lieux
            </button>
            <hr />
            <p>Exporter en PDF les états des lieux affichées dans le tableau</p>
            <InventoriesExportPDF inventories={inventories} />
            <hr />
            <InventoriesFilter inventories={inventories} setFilteredInventories={setFilteredInventories} />
            <InventoriesTable inventories={filteredInventories} />
        </div>
    );
};

export default Inventories;
