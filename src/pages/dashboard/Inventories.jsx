import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InventoriesSearchForm from "../../components/dashboard/inventories/InventoriesSearchForm";
import InventoriesTable from "../../components/dashboard/inventories/InventoriesTable";
import InventoriesFilter from "../../components/dashboard/inventories/InventoriesFilter";
import InventoriesExportPDF from "../../components/dashboard/inventories/InventoriesExportPDF";
import { setError } from "../../stores/slices/livretSlice";
import InventoryAddForm from "../../components/dashboard/inventories/InventoryAddForm";
import Loading from "../../components/Loading";
const process = require('process');

const Inventories = () => {
  const token = useSelector((state) => state.user.token);
  const [inventories, setInventories] = useState(null);
  const [filteredInventories, setFilteredInventories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "dashboard/inventories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInventories(data.inventories);
        setFilteredInventories(data.inventories);
      })
      .catch((err) => dispatch(setError({ error: err })));
  }, [token]);

  if (!inventories) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Etats de lieux</h2>
      <InventoriesSearchForm setFilteredInventories={setFilteredInventories} />
      <hr />
      <InventoryAddForm />
      <hr />
      <p>Exporter en PDF les états des lieux affichées dans le tableau</p>
      <InventoriesExportPDF inventories={inventories} />
      <hr />
      <InventoriesFilter
        inventories={inventories}
        setFilteredInventories={setFilteredInventories}
      />
      <InventoriesTable inventories={filteredInventories} />
    </div>
  );
};

export default Inventories;
