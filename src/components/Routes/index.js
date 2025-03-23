/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import EditLivret from '../../pages/dashboard/EditLivret';
import Politique from '../../pages/Politique';
import CguCgv from '../../pages/CguCgv';
import Mentions from '../../pages/Mentions';
import Livrets from '../../pages/Livrets';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }, [pathname]);
  
  return null;
};

const Index = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path={'/livret/:slug/:id'} element={<Livret />} />
                <Route element={<IndexLayout />}>
                    <Route path={'/livrets'} element={<Livrets />} />
                    <Route index element={<Welcome />} />
                    <Route path={'/connexion'} element={<Authentification />} />
                    <Route path={'/politique'} element={<Politique />} />
                    <Route path={'/cgu'} element={<CguCgv />} />
                    <Route path={'/cgv'} element={<CguCgv />} />
                    <Route path={'/mentions-legales'} element={<Mentions />} />
                </Route>
                <Route path={'premiere_connexion'} element={<FirstLogin />} />
                <Route path={'/dashboard'} element={<DashboardLayout />}>
                    <Route index element={<DashboardIndex />} />
                    <Route path={'profil'} element={<Profile />} />
                    <Route path={'background'} element={<Background />} />
                    <Route path={'stats'} element={<Stats />} />
                    <Route path={'suggestions'} element={<Suggest />} />
                    <Route path={'inventories'} element={<Inventories />} />
                    <Route path={'shop'} element={<Shop />} />
                    <Route path={'orders'} element={<Order />} />
                    <Route path={'edit_livret'} element={<EditLivret />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Index;
