import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexLayout from "../../layouts/IndexLayout";
import Welcome from "../../pages/Welcome";
import Authentification from "../../pages/Authentification";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardIndex from "../../pages/dashboard/DashboardIndex";
import FirstLogin from "../../pages/FirstLogin";
import Profile from "../../pages/dashboard/Profile";
import Livret from "../../pages/Livret";
import Background from "../../pages/dashboard/Background";

const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/livret/:slug/:id'} element={<Livret/>}/>
                <Route element={<IndexLayout/>}>
                    <Route index element={<Welcome/>}/>
                    <Route path={'/connexion'} element={<Authentification/>}/>
                </Route>
                <Route path={'/dashboard'} element={<DashboardLayout/>}>
                    <Route path={'premiere_connexion'} element={<FirstLogin/>}/>
                    <Route index element={<DashboardIndex/>}/>
                    <Route path={'profil'} element={<Profile/>}/>
                    <Route path={'background'} element={<Background/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Index;