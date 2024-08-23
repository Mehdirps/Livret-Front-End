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

const ModuleCard = ({ name, icon, title, data }) => {
    return (
        <>
            <div className="col-md-3 col-sm-4">
                <div className="card text-center">
                    <i className={`${icon}`}></i>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${name}Modal`}>
                        {title}
                    </button>
                </div>
            </div>
            {
                name === 'wifi' ?
                    <Wifi data={data} />
                    : name === 'digicode' ?
                        <Digicode data={data} />
                        : name === 'endInfos' ?
                            <EndInfos data={data} />
                            : name === 'homeInfos' ?
                                <HomeInfos data={data} />
                                : name === 'utilsPhone' ?
                                    <UtilsPhone data={data} />
                                    : name === 'startInfos' ?
                                        <StartInfos data={data} />
                                        : name === 'utilsInfos' ?
                                            <UtilsInfos data={data} />
                                            : name === 'placeGroups' ?
                                                <PlaceGroups data={data} />
                                                : name === 'nearbyPlaces' ?
                                                    <NearbyPlaces data={data} />
                                                    : null

            }
        </>
    );
};

export default ModuleCard;