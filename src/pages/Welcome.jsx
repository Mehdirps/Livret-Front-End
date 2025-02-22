import React from 'react';
import { Helmet } from 'react-helmet';

const Welcome = () => {
    return (
        <div>
            <Helmet>
                <title>Bienvenu sur Heberginfos - Heberginfos</title>
                <meta name="description" content="Bienvenue sur Heberginfos, le livret d'accueil ecologique des hébergements touristiques. Inscrivez-vous pour créer votre livret d'accueil en ligne qui sera accessible par vos locataires." />
            </Helmet>
            <h1>Bienvenue sur le livret d'accueil</h1>
        </div>
    );
};

export default Welcome;