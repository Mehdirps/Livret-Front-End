import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../stores/slices/userSlice';
import Sidebar from '../components/dashboard/Sidebar';
import Error from '../components/Error';
import Success from '../components/Success';
import { setError, setSuccess } from '../stores/slices/livretSlice';
import ShareLivret from '../components/dashboard/ShareLivret';

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
                        localStorage.setItem('openLogin', true);
                        navigate('/connexion');
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
