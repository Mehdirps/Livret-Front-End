import React, { useState } from "react";
import { useSelector } from "react-redux";
const process = require('process');

const StatsBetweenDatesForm = () => {
  const token = useSelector((state) => state.user.token);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [statsDatas, setStatsDatas] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_URL + "dashboard/statsBetweenDates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatsDatas(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {statsDatas && (
        <div className="card text-white bg-dark mb-3 mt-3">
          <div className="card-header">Vues entre deux dates</div>
          <div className="card-body">
            <h5 className="card-title">
              Du {statsDatas.startDate} au {statsDatas.endDate}
            </h5>
            <p className="card-text">
              Nombre de vues : {statsDatas.viewsBetweenDates}
            </p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-3">Vues entre deux dates</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="start_date" className="form-label">
                Date de début
              </label>
              <input
                type="date"
                className="form-control"
                id="start_date"
                name="start_date"
                required
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="end_date" className="form-label">
                Date de fin
              </label>
              <input
                type="date"
                className="form-control"
                id="end_date"
                name="end_date"
                required
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Voir les statistiques
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StatsBetweenDatesForm;
