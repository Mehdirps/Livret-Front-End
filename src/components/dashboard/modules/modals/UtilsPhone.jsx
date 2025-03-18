import React, { useState } from "react";
import DeleteModule from "../DeleteModule";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../../stores/slices/livretSlice";
const process = require('process');

const ModuleUtilsPhone = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const addModuleUtilsPhone = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);

    fetch(process.env.REACT_APP_API_URL + "dashboard/module/utils_phone", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          dispatch(setError({ error: data.error }));
          setName("");
          setNumber("");
        } else {
          dispatch(setSuccess({ success: data.message }));
          setName("");
          setNumber("");
        }
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
        setName("");
        setNumber("");
      });
  };

  return (
    <div
      className="modal fade"
      id="utilsPhoneModal"
      tabIndex="-1"
      aria-labelledby="utilsPhoneModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {data.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Numéro</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>
                        <DeleteModule module="utils_phone" id={item.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun numéro utile</p>
            )}
          </div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="wifiModalLabel">
                  Ajouter un numéro utile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form id="wifiForm" onSubmit={(e) => addModuleUtilsPhone(e)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number" className="form-label">
                      Numéro
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      name="number"
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="saveDigicode"
                  >
                    Sauvegarder
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleUtilsPhone;
