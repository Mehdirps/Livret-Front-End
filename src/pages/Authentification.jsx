import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { Helmet } from "react-helmet";

const Authentification = () => {
  const [openLogin, setOpenLogin] = useState(
    sessionStorage.getItem("openLogin") === "true"
  );

  return (
    <div className="p-5">
      <Helmet>
        <title>Connexion / Inscription - Heberginfos</title>
        <meta
          name="description"
          content="Connectez-vous ou inscrivez-vous sur Heberginfos pour créer votre livret d'accueil en ligne qui sera accessible par vos visiteurs."
        />
      </Helmet>
      {openLogin ? (
        <LoginForm setOpenLogin={setOpenLogin} />
      ) : (
        <RegisterForm setOpenLogin={setOpenLogin} />
      )}
    </div>
  );
};

export default Authentification;
