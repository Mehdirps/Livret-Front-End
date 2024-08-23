import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { setError } from '../../stores/slices/livretSlice';
import ModuleCard from '../../components/dashboard/modules/ModuleCard';

const EditLivret = () => {

    const token = useSelector((state) => state.user.token);

    const livret = useSelector((state) => state.livret.livret);

    const [modules, setModules] = useState(null);

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
                dispatch(setError({ error: data.error }));
            } else {
                setModules(data.modules);
            }
        }).catch((error) => {
            dispatch(setError({ error: error }));
        });
    }, []);

    if (!modules) {
        return (
            <Loading />
        );
    }

    return (
        <div>
            <h1 className='text-center'>Editer le livret - <strong>{livret?.livret_name}</strong></h1>
            <div className="row container">
                <div className="col-12 row d-flex justify-content-center mt-5 mb-5 gap-3">
                    <button type="button" className="btn btn-primary col-md-3" data-bs-toggle="modal" data-bs-target="#modulesOrderModal">
                        Changer l'ordre des modules
                    </button>
                    <button type="button" className="btn btn-secondary col-md-3" data-bs-toggle="modal" data-bs-target="#textDesignModal">
                        Changer le design des textes
                    </button>
                </div>
                <div className="row d-flex gap-3 justify-content-center">
                    {
                        modules.map((module) => {
                            return (
                                <ModuleCard key={module.type.name} name={module.type.name} icon={module.icon} title={module.type.title} data={module.data}/>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default EditLivret;