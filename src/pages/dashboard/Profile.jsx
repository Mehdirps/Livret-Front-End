/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import UserProfileForm from "../../components/dashboard/profile/UserProfileForm";
import LivretProfileForm from "../../components/dashboard/profile/LivretProfileForm";

const Profile = () => {
    const user = useSelector(state => state.user.user);

    if(!user) {
        return (
            <Loading />
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center">
                            {user && user.avatar && (
                                <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', margin: 'auto' }}>
                                    <img
                                        src={process.env.REACT_APP_URL +  user.avatar}
                                        alt="avatar"
                                        className="img-thumbnail"
                                        style={{ width: '100px', objectFit: 'cover' }}
                                    />
                                </figure>
                            )}
                            <h1>{user ? user.name : <Loading/> }</h1>
                        </div>
                    </div>
                    <hr/>
                    <UserProfileForm/>
                    <hr/>
                    <LivretProfileForm/>
                </div>
            </div>
        </div>
    );
};

export default Profile;
