import React from "react";

const ModuleUtilsInfos = ({ data }) => {
  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-6">
        <button
          type="button"
          className="btn w-100"
          data-bs-toggle="modal"
          data-bs-target="#utilsInfosModal"
        >
          <div className="card text-center w-100">
            <i className="bi bi-info-circle-fill"></i>
            Infos utiles
          </div>
        </button>
      </div>
      <div
        className="modal fade"
        id="utilsInfosModal"
        tabIndex="-1"
        aria-labelledby="utilsInfosModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="utilsInfosModalLabel">
                Infos pratiques
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Vous trouverez ici toutes les informations dont vous pouvez
                avoir besoin
              </p>
              {data.length > 0 && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Infos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.sub_name}</td>
                        <td>{item.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleUtilsInfos;
