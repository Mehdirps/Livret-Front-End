import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Error from '../components/Error';
import Success from '../components/Success';
import { Helmet } from 'react-helmet';

const Livret = () => {
    const { slug, id } = useParams();
    const [livret, setLivret] = useState(null);
    const [modules, setModules] = useState([]);
    const [homeInfos, setHomeInfos] = useState(null);

    const error = useSelector(state => state.livret.error);
    const success = useSelector(state => state.livret.success);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}livret/${slug}/${id}`)
            .then(response => response.json())
            .then(data => {
                setLivret(data.livret);

                const dataModules = data.modules;
                setModules([
                    { data: dataModules.wifi.data, component: <ModuleWifi data={dataModules.wifi.data} />, order: dataModules.wifi.order },
                    { data: dataModules.digicode.data, component: <ModuleDigicode data={dataModules.digicode.data} />, order: dataModules.digicode.order },
                    { data: dataModules.endInfos.data, component: <ModuleEndInfos data={dataModules.endInfos.data} />, order: dataModules.endInfos.order },
                    { data: dataModules.utilsPhone.data, component: <ModuleUtilsPhone data={dataModules.utilsPhone.data} />, order: dataModules.utilsPhone.order },
                    { data: dataModules.startInfos.data, component: <ModuleStartInfos data={dataModules.startInfos.data} />, order: dataModules.startInfos.order },
                    { data: dataModules.utilsInfos.data, component: <ModuleUtilsInfos data={dataModules.utilsInfos.data} />, order: dataModules.utilsInfos.order },
                    {
                        data: dataModules.NearbyPlaces.data, component: <ModuleNearbyPlaces data={dataModules.NearbyPlaces.data} dataPlaces={dataModules.placeGroups.data} />, order: dataModules.NearbyPlaces.order
                    }
                ]);
                setHomeInfos(dataModules.homeInfos.data);
            });
    }, [slug, id]);

    console.log(livret);
    

    if (!livret) {
        return <Loading />;
    }

    return (
        <div style={{
            height: "100vh",
            backgroundImage: `url(${process.env.REACT_APP_URL}${livret.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: livret.text_color,
            fontFamily: livret.font
        }}>
            <Helmet>
                <title>{livret.establishment_name} - Heberginfos</title>
                <meta name="description" content={`Découvrez le livret d'accueil '${livret.livret_name}' de l'établissement ${livret.establishment_name}, ${livret.description}`} />
            </Helmet>
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
                        {
                            modules
                                .filter(module => module.data && module.data.length > 0)
                                .sort((a, b) => a.order - b.order)
                                .map(module => module.component)
                        }
                    </div>
                    <HomeInfosModal livret={livret} homeInfos={homeInfos} />
                </div>
            </main>
            <LivretFooter livret={livret} />
            {
                error && (
                    <Error error={error} />
                )
            }
            {
                success && (
                    <Success success={success} />
                )
            }
        </div>
    );
};

export default Livret;