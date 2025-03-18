import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../../stores/slices/livretSlice";
import DeleteModule from "../DeleteModule";
const process = require('process');

const ModuleWifi = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  const addModuleWifi = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("wifiName", wifiName);
    formData.append("wifiPassword", wifiPassword);

    fetch(process.env.REACT_APP_API_URL + "dashboard/module/wifi", {
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
          setWifiName("");
          setWifiPassword("");
        } else {
          dispatch(setSuccess({ success: data.message }));
          setWifiName("");
          setWifiPassword("");
        }
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
        setWifiName("");
        setWifiPassword("");
      });
  };

  return (
    <div
      className="modal fade"
      id="wifiModal"
      tabIndex="-1"
      aria-labelledby="wifiModalLabel"
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
                    <th>Code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.ssid}</td>
                      <td>{item.password}</td>
                      <td>
                        <DeleteModule module="wifi" id={item.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun WiFi</p>
            )}
          </div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="wifiModalLabel">
                  Ajouter un WiFi
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="wifiForm"
                  method="post"
                  onSubmit={(e) => addModuleWifi(e)}
                >
                  <div className="mb-3">
                    <label htmlFor="wifiName" className="form-label">
                      Nom du WiFi
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="wifiName"
                      name="wifiName"
                      required
                      onChange={(e) => setWifiName(e.target.value)}
                      defaultValue={wifiName}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="wifiPassword" className="form-label">
                      Mot de passe du WiFi
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="wifiPassword"
                      name="wifiPassword"
                      required
                      onChange={(e) => setWifiPassword(e.target.value)}
                      defaultValue={wifiPassword}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="saveWifi"
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

export default ModuleWifi;
