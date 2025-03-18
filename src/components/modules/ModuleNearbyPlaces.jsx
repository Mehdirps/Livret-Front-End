import React from "react";

const ModuleNearbyPlaces = ({ data, dataPlaces }) => {
  const prepareNearbyPlacesData = (nearbyPlaces, placeGroups) => {
    return placeGroups.map((group) => ({
      ...group,
      nearbyPlaces: nearbyPlaces.filter(
        (place) => place.place_group_id === group.id
      ),
    }));
  };

  const preparedData = prepareNearbyPlacesData(data, dataPlaces);

  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-6">
        <button
          type="button"
          className="btn w-100"
          data-bs-toggle="modal"
          data-bs-target="#placesGroupsModal"
        >
          <div className="card text-center w-100">
            <i className="bi bi-geo-alt-fill"></i>
            Lieux à proximité
          </div>
        </button>
      </div>
      <div
        className="modal fade"
        id="placesGroupsModal"
        tabIndex="-1"
        aria-labelledby="placesGroupsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placesGroupsModalLabel">
                Lieux à proximité
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              {preparedData.map(
                (group) =>
                  group.nearbyPlaces.length > 0 && (
                    <div className="card mb-3 w-50 h-100" key={group.id}>
                      <div className="card-header text-center">
                        {group.name}
                      </div>
                      <ul className="list-group list-group-flush">
                        {group.nearbyPlaces.map((place) => (
                          <li className="list-group-item" key={place.id}>
                            <h6 className="mb-1">{place.name}</h6>
                            <p className="mb-0">{place.address}</p>
                            <p className="mb-0">{place.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
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
    </>
  );
};

export default ModuleNearbyPlaces;
