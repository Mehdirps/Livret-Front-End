import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModuleWifi from "../components/modules/ModuleWifi";
import ModuleDigicode from "../components/modules/ModuleDigicode";
import ModuleEndInfos from "../components/modules/ModuleEndInfos";
import ModuleUtilsPhone from "../components/modules/ModuleUtilsPhone";
import ModuleStartInfos from "../components/modules/ModuleStartInfos";
import ModuleUtilsInfos from "../components/modules/ModuleUtilsInfos";
import ModuleNearbyPlaces from "../components/modules/ModuleNearbyPlaces";
import HomeInfosModal from "../components/modules/HomeInfosModal";
import Loading from "../components/Loading";
import LivretFooter from '../components/LivretFooter';


const Livret = () => {
    const { slug, id } = useParams();
    const [livret, setLivret] = useState(null);
    const [modules, setModules] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}livret/${slug}/${id}`)
            .then(response => response.json())
            .then(data => {
                setLivret(data.livret);
                setModules(data.modules);
            });
    }, [slug, id]);

    if (!livret) {
        return <Loading />;
    }

    return (
        <div style={{
            height: "100vh",
            backgroundImage: `url(${process.env.REACT_APP_URL}${livret.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <main>
                <div className="container py-5 text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <img src={`${process.env.REACT_APP_URL}${livret.logo}`} alt="Logo" style={{ width: '100px' }}
                                className="img-fluid rounded-circle mx-auto d-block" />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-6">
                            <h1 className="display-4">{livret.livret_name}</h1>
                            <p className="lead">{livret.description}</p>
                        </div>
                    </div>
                    <div className="row modules">
                        {modules.wifi.length > 0 && <ModuleWifi data={modules.wifi} />}
                        {modules.digicode.length > 0 && <ModuleDigicode data={modules.digicode} />}
                        {modules.endInfos.length > 0 && <ModuleEndInfos data={modules.endInfos} />}
                        {modules.utilsPhone.length > 0 && <ModuleUtilsPhone data={modules.utilsPhone} />}
                        {modules.startInfos.length > 0 && <ModuleStartInfos data={modules.startInfos} />}
                        {modules.utilsInfos.length > 0 && <ModuleUtilsInfos data={modules.utilsInfos} />}
                        {modules.NearbyPlaces.length > 0 &&
                            <ModuleNearbyPlaces data={modules.NearbyPlaces} dataPlaces={modules.placeGroups} />}
                    </div>
                    <HomeInfosModal livret={livret} homeInfos={modules.homeInfos} />
                </div>
            </main>
            <LivretFooter livret={livret} />
        </div>
    );
};

export default Livret;
