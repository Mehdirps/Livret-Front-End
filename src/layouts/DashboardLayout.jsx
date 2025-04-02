/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../stores/slices/userSlice';
import Sidebar from '../components/dashboard/Sidebar';
import Error from '../components/Error';
import Success from '../components/Success';
import { clearLivret, setError, setSuccess } from '../stores/slices/livretSlice';
import ShareLivret from '../components/dashboard/ShareLivret';
import { setLivret } from '../stores/slices/livretSlice';
import { Helmet } from 'react-helmet';

const DashboardLayout = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(state => state.livret.error);
    const success = useSelector(state => state.livret.success);

    const active_path = window.location.pathname;

    useEffect(() => {
        if (!token) {
            dispatch(clearUser());
            dispatch(clearLivret());
            localStorage.setItem('openLogin', true);
            navigate('/connexion');
        } else {
            fetch(`${process.env.REACT_APP_API_URL}dashboard/verify_token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then(response => response.json())
                .then(data => {
                    if (data.error || data.jwt_error) {
                        dispatch(clearUser());
                        dispatch(clearLivret());
                        localStorage.setItem('openLogin', true);
                        navigate('/connexion');
                    } else {
                        if (data.message_lot_of_request) {
                            dispatch(setError({ error: data.message_lot_of_request }));
                            dispatch(clearLivret());
                            dispatch(clearUser());
                            return;
                        }

                        dispatch(setUser({ user: data.user, token: token }));

                        fetch(`${process.env.REACT_APP_API_URL}dashboard`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        }).then(response => response.json())
                            .then(data => {
                                dispatch(setLivret({ livret: data.livret }));
                            })
                            .catch((error) => {
                                dispatch(setError({ error: error }));
                            });
                    }
                });
        }
    }, [active_path]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setError({ error: null }));
            dispatch(setSuccess({ success: null }));
        }, 5000);
    }, [error, success, dispatch]);


    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <Helmet>
                <title>Heberginfos - Dashboard</title>
                <meta name="description" content="Dashboard de Heberginfos" />
            </Helmet>
            <div className="row container" style={{ minHeight: '100vh', maxWidth: '100vw', marginTop: '50px' }}>
                <button
                    className="btn btn-dark d-md-none"
                    onClick={toggleSidebar}
                    style={{ position: 'fixed', top: 10, left: 10, zIndex: 1060, width: '40px', height: '40px' }}
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className={`col-md-3 col-12 ${isSidebarVisible ? 'd-block' : 'd-none'} d-md-block`}>
                    <Sidebar toggleSidebar={toggleSidebar} />
                </div>
                <div className="col-md-9 col-12">
                    <main>
                        {error && <Error error={error} />}
                        {success && <Success success={success} />}
                        <Outlet />
                    </main>
                </div>
                <ShareLivret />
            </div>
        </>
    );
};

export default DashboardLayout;
