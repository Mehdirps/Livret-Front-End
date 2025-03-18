import React from "react";
import { Helmet } from "react-helmet";
const process = require('process');

const Welcome = () => {
  const title =
    process.env.REACT_APP_WELCOME_TITLE ||
    "Bienvenu sur Heberginfos - Heberginfos";
  const description =
    process.env.REACT_APP_WELCOME_DESCRIPTION ||
    "Bienvenue sur Heberginfos, le livret d'accueil ecologique des hébergements touristiques. Inscrivez-vous pour créer votre livret d'accueil en ligne qui sera accessible par vos locataires.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <section className="welcome">
        <h1>Découvrez le livret d’accueil écologique Heberginfos !</h1>
        <div className="container presentation">
          <p className="presentation_text">
            Heberginfos est un livret d’accueil en ligne pour les hébergements
            touristiques. Il est accessible par vos locataires et vous permet de
            leur donner toutes les informations nécessaires pour leur séjour.
            Fini le gaspillage de papier, avec Heberginfos, votre livret
            d’accueil est écologique et accessible en ligne.
          </p>
          <figure>
            <img
              src="./img/website.svg"
              alt="Illustration pour montrer le site web"
            />
          </figure>
        </div>
        <div className="points_fort">
          <h2>Nos points forts</h2>
          <div className="points_fort_cards container">
            <div className="points_fort_card">
              <h3>Écologique</h3>
              <img
                src="./img/ecolo.svg"
                alt="Illustration pour montrer le coté écologique"
              />
              <p>
                Le livret d’accueil est dématérialisé, il n’y a pas de
                gaspillage de papier.
              </p>
            </div>
            <div className="points_fort_card">
              <h3>Accessible</h3>
              <img
                src="./img/online.svg"
                alt="Illustration pour montrer l'accessibilité"
              />
              <p>
                Le livret d’accueil est accessible en ligne par vos locataires.
              </p>
            </div>
            <div className="points_fort_card">
              <h3>Personnalisable</h3>
              <img
                src="./img/custom.svg"
                alt="Illustration pour montrer la personnalisation"
              />
              <p>
                Vous pouvez personnaliser votre livret d’accueil en fonction de
                votre hébergement.
              </p>
            </div>
          </div>
          <div className="text">
            <div className="container">
              <p>
                Heberginfos vous offre une solution innovante et respectueuse de
                l'environnement pour accueillir vos locataires. Grâce à notre
                plateforme, vous pouvez créer un livret d'accueil unique et
                personnalisé, tout en réduisant votre empreinte écologique. Nos
                livrets sont accessibles en ligne, ce qui permet à vos
                locataires d'avoir toutes les informations nécessaires à portée
                de main, où qu'ils soient. De plus, notre interface intuitive
                vous permet de mettre à jour facilement les informations de
                votre livret, garantissant ainsi que vos locataires disposent
                toujours des informations les plus récentes.
              </p>
            </div>
          </div>
          <div className="livret_infos container">
            <h2>
              Les informations que vous pouvez mettre dans votre livret
              d'accueil
            </h2>
            <div className="livret_infos_icons">
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Wifi
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Digicode
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Arrivée
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Départ
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Numéros
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Infos
              </div>
              <div className="livret_infos_icon">
                <i className="bi bi-house-door-fill"></i>
                Lieux
              </div>
            </div>
          </div>
          <div className="container livret_demo">
            <h2>Exemple de livret d'accueil</h2>
            <figure>
              <img
                src="./img/livret-demo.png"
                alt="Un livret d'accueil de démonstration"
              />
            </figure>
            <a
              href="https://herbeginfos.fr/livret/livret-mehdi-hotel/1"
              className="demo_button"
              target="_blank"
              rel="noreferrer"
            >
              Découvrir le livret de démonstration
            </a>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
