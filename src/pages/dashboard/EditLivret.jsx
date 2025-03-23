/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/Loading';
import {setError} from '../../stores/slices/livretSlice';
import ModuleCard from '../../components/dashboard/modules/ModuleCard';
import UpdatetextStyle from '../../components/dashboard/UpdatetextStyle';
import ChangeModulesOrders from '../../components/dashboard/modules/ChangeModulesOrders';

const EditLivret = () => {

    const token = useSelector((state) => state.user.token);

    const livret = useSelector((state) => state.livret.livret);

    const [modules, setModules] = useState(null);

    const success = useSelector((state) => state.livret.success);
    const error = useSelector((state) => state.livret.error);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/get_all_livret_modules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.error) {
                dispatch(setError({error: data.error}));
            } else {
                setModules(data.modules);
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
        });
    }, [success, error]);

    if (!modules || !livret) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <h1 className='text-center'>Editer le livret - <strong>{livret?.livret_name}</strong></h1>
            <div className="row container">
                <div className="col-12 row d-flex justify-content-center mt-5 mb-5 gap-3">
                    <ChangeModulesOrders modules={modules}/>
                    <UpdatetextStyle/>
                </div>
                <div className="row d-flex gap-3 justify-content-center">
                    {
                        modules
                            .filter((module) => module.order !== null)
                            .sort((a, b) => a.order - b.order)
                            .map((module) => {
                                return (
                                    <ModuleCard key={module.type.name} module={module}/>
                                );
                            })
                    }
                    {
                        modules
                            .filter((module) => module.order === null)
                            .map((module) => {
                                return (
                                    <ModuleCard key={module.type.name} module={module}/>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default EditLivret;
