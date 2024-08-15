import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setLivret, setSuccess } from "../../stores/slices/livretSlice";
import Loading from "../../components/Loading";

const Background = () => {
    const livret = useSelector(state => state.livret.livret);
    const token = useSelector(state => state.user.token);
    const [backgroundGroups, setBackgroundGroups] = useState([])
    const [selectedGroupId, setSelectedGroupId] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/background', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                const groups = data.background_groups.map(group => {
                    const backgrounds = data.backgrounds.filter(background => background.backgrounds_group_id === group.id);
                    return {
                        ...group,
                        backgrounds
                    }

                });

                setBackgroundGroups(groups);
            });
    },
        []
    )
        ;

    const handleChooseBackground = (backgroundId) => {

        fetch(process.env.REACT_APP_API_URL + 'dashboard/background/' + backgroundId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(setSuccess({ success: data.message}));
                dispatch(setLivret({ livret: data.livret }));
            }
            );
    }

    if (backgroundGroups.length === 0) {
        return (
            <Loading />
        );
    }

    return (
        <div>
            <h1>Changer le fond de votre livret</h1>
            <div className="row">
                <div className="col-md-4">
                    <p>Fond actuel</p>
                    {livret.background && (
                        <img src={process.env.REACT_APP_URL + livret.background} alt="Fond actuel"
                            className="img-fluid" />
                    )}
                </div>
            </div>
            <p>Cliquez sur le fond que vous souhaitez pour le changer</p>
            <div className="row w-100 d-flex justify-content-center">
                {backgroundGroups.map(group => (
                    <div className="col-md-3" key={group.id}>
                        <div className="card">
                            <button className="btn btn-primary btn_group" onClick={() => setSelectedGroupId(group.id)}>
                                {group.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {backgroundGroups.map(group => (
                group.id === selectedGroupId && (
                    <div className="col-md-12 backgroup_card_group" key={group.id}>
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <div className="container">
                            <div className="row">
                                {
                                    group.backgrounds.length > 0 ?
                                        group.backgrounds.map((background) => (
                                            <div className={"card col-md-4 backgroup_card"} key={background.id}
                                                onClick={() => handleChooseBackground(background.id)}>
                                                <img src={process.env.REACT_APP_URL + background.path}
                                                    alt={background.name}
                                                    className="img-fluid w-100 h-100" />
                                            </div>
                                        ))
                                        : <div className="alert alert-warning">Aucun fond disponible</div>
                                }
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default Background;
