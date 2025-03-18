import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../stores/slices/livretSlice";
const process = require('process');

const DeleteModule = ({ module, id }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const deleteDigicode = (module, id) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ce ${module} ?`)) {
      return;
    }

    fetch(process.env.REACT_APP_API_URL + `dashboard/module/${module}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          dispatch(setError({ error: data.error }));
        } else {
          dispatch(setSuccess({ success: data.message }));
        }
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  };

  return (
    <button
      type="submit"
      className="btn btn-danger"
      onClick={() => deleteDigicode(module, id)}
    >
      Supprimer
    </button>
  );
};

export default DeleteModule;
