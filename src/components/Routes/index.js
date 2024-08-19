import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexLayout from "../../layouts/IndexLayout";
import Welcome from "../../pages/Welcome";
import Authentification from "../../pages/Authentification";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardIndex from "../../pages/dashboard/DashboardIndex";
import FirstLogin from "../../pages/FirstLogin";
import Profile from "../../pages/dashboard/Profile";
import Livret from "../../pages/Livret";
import Background from "../../pages/dashboard/Background";
import Stats from "../../pages/dashboard/Stats";
import Suggest from "../../pages/dashboard/Suggest";
import Inventories from '../../pages/dashboard/Inventories';
import Shop from '../../pages/dashboard/Shop';
import Order from '../../pages/dashboard/Order';

const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/livret/:slug/:id'} element={<Livret />} />
                <Route element={<IndexLayout />}>
                    <Route index element={<Welcome />} />
                    <Route path={'/connexion'} element={<Authentification />} />
                </Route>
                <Route path={'/dashboard'} element={<DashboardLayout />}>
                    <Route path={'premiere_connexion'} element={<FirstLogin />} />
                    <Route index element={<DashboardIndex />} />
                    <Route path={'profil'} element={<Profile />} />
                    <Route path={'background'} element={<Background />} />
                    <Route path={'stats'} element={<Stats />} />
                    <Route path={'suggestions'} element={<Suggest />} />
                    <Route path={'inventories'} element={<Inventories />} />
                    <Route path={'shop'} element={<Shop />} />
                    <Route path={'orders'} element={<Order />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Index;