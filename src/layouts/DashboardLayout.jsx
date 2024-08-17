import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../stores/slices/userSlice';
import Sidebar from '../components/dashboard/Sidebar';
import Error from '../components/Error';
import Success from '../components/Success';
import { clearLivret, setError, setSuccess } from '../stores/slices/livretSlice';
import ShareLivret from '../components/dashboard/ShareLivret';
import { setLivret } from '../stores/slices/livretSlice';

const DashboardLayout = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(state => state.livret.error);
    const success = useSelector(state => state.livret.success);

    const active_path = window.location.pathname;

    useEffect(() => {
        if (!user || !token) {
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
                    }else{
                        dispatch(setUser({ user: data.user, token: token }));
                        
                        fetch(`${process.env.REACT_APP_API_URL}dashboard`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        }).then(response => response.json())
                            .then(data => {
                                dispatch(setLivret({livret: data.livret}));
                            })
                            .catch((error) => {
                                dispatch(setError({ error: error }));
                            });
                    }
                });
        }
    }, [active_path, user, token, dispatch, navigate]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setError({ error: null }));
            dispatch(setSuccess({ success: null }));
        }, 5000);
    }, [error, success, dispatch]);

    return (
        <div className="row" style={{ minHeight: '100vh', maxWidth: '100vw' }}>
            <div className="col-md-3 col-12">
                <Sidebar />
            </div>
            <div className="col-md-9 col-10">
                <main>
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
                    <Outlet />
                </main>
            </div>
            <ShareLivret />
        </div>
    );
};

export default DashboardLayout;
