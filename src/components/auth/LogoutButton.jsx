import React from "react";
import { clearUser } from "../../stores/slices/userSlice";
import { clearLivret } from "../../stores/slices/livretSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearLivret());
    navigate("/");
  };

  return (
    <div className="btn btn-danger" onClick={() => handleLogout()}>
      <i className="bi bi-box-arrow-right"></i> Déconnexion
    </div>
  );
};

export default LogoutButton;
