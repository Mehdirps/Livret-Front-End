/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import Wifi from './modals/Wifi';
import Digicode from './modals/Digicode';
import EndInfos from './modals/EndInfos';
import HomeInfos from './modals/HomeInfos';
import UtilsPhone from './modals/UtilsPhone';
import StartInfos from './modals/StartInfos';
import UtilsInfos from './modals/UtilsInfos';
import PlaceGroups from './modals/PlaceGroups';
import NearbyPlaces from './modals/NearbyPlaces';

const ModuleCard = ({ module }) => {
    return (
        <>
            <div className="col-md-3 col-sm-4">
                <div className="card text-center">
                    <i className={`${module.icon}`}></i>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${module.type.name}Modal`}>
                        {module.type.title}
                    </button>
                </div>
            </div>
            {
                module.type.name === 'wifi' ?
                    <Wifi data={module.data} />
                    : module.type.name === 'digicode' ?
                        <Digicode data={module.data} />
                        : module.type.name === 'endInfos' ?
                            <EndInfos data={module.data} />
                            : module.type.name === 'homeInfos' ?
                                <HomeInfos data={module.data} />
                                : module.type.name === 'utilsPhone' ?
                                    <UtilsPhone data={module.data} />
                                    : module.type.name === 'startInfos' ?
                                        <StartInfos data={module.data} />
                                        : module.type.name === 'utilsInfos' ?
                                            <UtilsInfos data={module.data} />
                                            : module.type.name === 'placeGroups' ?
                                                <PlaceGroups data={module.data} />
                                                : module.type.name === 'nearbyPlaces' ?
                                                    <NearbyPlaces data={module.data} />
                                                    : null

            }
        </>
    );
};

export default ModuleCard;
