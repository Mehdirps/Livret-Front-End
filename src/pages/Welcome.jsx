import React from 'react';
import { Helmet } from 'react-helmet';

const Welcome = () => {
    return (
        <>
            <Helmet>
                <title>Bienvenu sur Heberginfos - Heberginfos</title>
                <meta name="description" content="Bienvenue sur Heberginfos, le livret d'accueil ecologique des hébergements touristiques. Inscrivez-vous pour créer votre livret d'accueil en ligne qui sera accessible par vos locataires." />
            </Helmet>
            <section>
                <h1>Découvrez le livret d’accueil écologique Heberginfos !</h1>
            </section>
        </>
    );
};

export default Welcome;