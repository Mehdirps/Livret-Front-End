import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../stores/slices/userSlice';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className="row" style={{minHeight: '100vh', maxWidth:'100vw'}}>
            <div className="col-md-3 col-12">
                <Sidebar />
            </div>
            <div className="col-md-9 col-10">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
