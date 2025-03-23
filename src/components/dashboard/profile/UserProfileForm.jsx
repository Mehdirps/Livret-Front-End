/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PasswordProfileForm from "./PasswordProfileForm";
import {setUserAfterUpdate} from "../../../stores/slices/userSlice";
import {setSuccess, setError} from "../../../stores/slices/livretSlice";

const UserProfileForm = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);

    const [civility, setCivility] = useState(user?.civility || '');
    const [name, setName] = useState(user?.name || '');
    const email = user?.email;
    const [phone, setPhone] = useState(user?.phone || '');
    const [birthDate, setBirthDate] = useState(user?.birth_date || '');
    const [address, setAddress] = useState(user?.address || '');
    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (avatar) {
            formData.append('avatar', avatar);
        }

        formData.append('civility', civility);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('birth_date', birthDate);
        formData.append('address', address);
        formData.append('admin_update', 0);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/profile', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({error: data.error}));
                } else {
                    dispatch(setSuccess({success: data.message}));
                    dispatch(setUserAfterUpdate({user: data.user}));
                }
            })
            .catch(error => dispatch(setError({error: error})));
    };



    return (
        <div className="col-12">
            <form onSubmit={(e) => handleSubmit(e)} className="p-5 bg-light rounded"
                  encType="multipart/form-data">
                <h3><i className="bi bi-info-circle"></i> Vos informations</h3>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="civility">Civilité</label>
                        <select className="form-control" name="civility" id="civility" value={civility}
                                onChange={(e) => setCivility(e.target.value)}>
                            <option value="" disabled>-- Choisir --</option>
                            <option value="M.">M.</option>
                            <option value="Mme">Mme</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="name">Nom</label>
                        <input type="text" className="form-control" id="name" name="name" required
                               placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="email">Adresse email</label>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" className="form-control" id="phone" name="phone"
                               placeholder="Votre numéro de téléphone" value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="birth_date">Date de naissance</label>
                        <input type="date" className="form-control" id="birth_date" name="birth_date" value={birthDate}
                               onChange={(e) => setBirthDate(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" className="form-control" id="address" name="address"
                               placeholder="Votre adresse" value={address}
                               onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        {user?.avatar && (
                            <>
                                <p>Avatar actuel</p>
                                <figure style={{borderRadius: '50%', overflow: 'hidden', width: '100px'}}>
                                    <img src={process.env.REACT_APP_URL + user.avatar} alt="avatar"
                                         className="img-thumbnail" style={{width: '100px', objectFit: 'cover'}}/>
                                </figure>
                            </>
                        )}
                        <label htmlFor="avatar">Changer mon Avatar</label>
                        <input type="file" className="form-control" id="avatar" name="avatar"
                               onChange={(e) => setAvatar(e.target.files[0])} aria-describedby="avatarHelp"/>
                        <small id="avatarHelp" className="form-text text-muted">Seuls les fichiers PNG, JPG, JPEG et
                            WEBP sont autorisés</small>
                    </div>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Mettre à jour mes informations</button>
            </form>
            <br/>
            <PasswordProfileForm/>
        </div>
    );
};

export default UserProfileForm;
