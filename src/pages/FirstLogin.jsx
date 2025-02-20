import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const FirstLogin = () => {

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if(!user.first_login){
            navigate('/dashboard');
        }
    }, []);

    const [livretName, setLivretName] = useState('');
    const [establishmentType, setEstablishmentType] = useState('');
    const [establishmentName, setEstablishmentName] = useState('');
    const [establishmentAddress, setEstablishmentAddress] = useState('');
    const [establishmentPhone, setEstablishmentPhone] = useState('');
    const [establishmentEmail, setEstablishmentEmail] = useState('');
    const [establishmentWebsite, setEstablishmentWebsite] = useState('');
    const token = useSelector(state => state.user.token);

    const [errors, setErrors] = useState({});
    const [requestError, setRequestError] = useState("");

    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!livretName) newErrors.livretName = 'Le nom du livret est obligatoire';
        if (!establishmentType) newErrors.establishmentType = 'Le type d\'établissement est obligatoire';
        if (!establishmentName) newErrors.establishmentName = 'Le nom de l\'établissement est obligatoire';
        if (!establishmentAddress) newErrors.establishmentAddress = 'L\'adresse de l\'établissement est obligatoire';
        if (!establishmentPhone) newErrors.establishmentPhone = 'Le téléphone de l\'établissement est obligatoire';
        if (!establishmentEmail) newErrors.establishmentEmail = 'L\'email de l\'établissement est obligatoire';
        if (!establishmentWebsite) newErrors.establishmentWebsite = 'Le site web de l\'établissement est obligatoire';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setRequestError("");

        if (!validate()) return;

        fetch(`${process.env.REACT_APP_API_URL}dashboard/first_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                livret_name: livretName,
                establishment_type: establishmentType,
                establishment_name: establishmentName,
                establishment_address: establishmentAddress,
                establishment_phone: establishmentPhone,
                establishment_email: establishmentEmail,
                establishment_website: establishmentWebsite,
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigate('/dashboard');
                } else {
                    setRequestError(data.error || data.jwt_error || "Une erreur est survenue");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Création de votre livret d'accueil !</h1>
                    <p>Vous êtes sur le point de créer votre livret d'accueil. Pour cela, veuillez remplir les
                        informations suivantes :</p>
                    {
                        requestError &&
                        <div className="alert alert-danger">{requestError}</div>
                    }
                    <form onSubmit={handleSubmit} className="p-5 bg-light rounded">
                        <div className="form-group">
                            <label htmlFor="livret_name" className="form-label"><i className="bi bi-building"></i>Nom du
                                livret</label>
                            <input type="text" className="form-control" id="livret_name" value={livretName}
                                   onChange={(e) => setLivretName(e.target.value)} required/>
                            {errors.livretName && <div className="alert alert-danger">{errors.livretName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="establishment_type">Type d'établissement</label>
                            <select className="form-control" id="establishment_type"
                                    onChange={(e) => setEstablishmentType(e.target.value)} required>
                                <option disabled selected>-- Choisissez un type d'établissement --</option>
                                <option value="camping">Un camping</option>
                                <option value="chambre_hotes">Une chambre d'hôtes</option>
                                <option value="b&b">Une conciergerie B&B</option>
                                <option value="location">Un gestionnaire de location</option>
                                <option value="particulier">Un particulier</option>
                                <option value="gite">Un gîte</option>
                                <option value="hotel">Un hôtel</option>
                            </select>
                            {errors.establishmentType &&
                                <div className="alert alert-danger">{errors.establishmentType}</div>}
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="establishment_name" className="form-label"><i
                                        className="bi bi-building"></i> Nom de l'établissement</label>
                                    <input type="text" className="form-control" id="establishment_name"
                                           value={establishmentName}
                                           onChange={(e) => setEstablishmentName(e.target.value)} required/>
                                    {errors.establishmentName &&
                                        <div className="alert alert-danger">{errors.establishmentName}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="establishment_address" className="form-label"><i
                                        className="bi bi-geo-alt"></i> Adresse de l'établissement</label>
                                    <input type="text" className="form-control" id="establishment_address"
                                           value={establishmentAddress}
                                           onChange={(e) => setEstablishmentAddress(e.target.value)} required/>
                                    {errors.establishmentAddress &&
                                        <div className="alert alert-danger">{errors.establishmentAddress}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="establishment_phone" className="form-label"><i
                                        className="bi bi-telephone"></i> Téléphone de l'établissement</label>
                                    <input type="text" className="form-control" id="establishment_phone"
                                           value={establishmentPhone}
                                           onChange={(e) => setEstablishmentPhone(e.target.value)} required/>
                                    {errors.establishmentPhone &&
                                        <div className="alert alert-danger">{errors.establishmentPhone}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="establishment_email" className="form-label"><i
                                        className="bi bi-envelope"></i> Email de l'établissement</label>
                                    <input type="email" className="form-control" id="establishment_email"
                                           value={establishmentEmail}
                                           onChange={(e) => setEstablishmentEmail(e.target.value)} required/>
                                    {errors.establishmentEmail &&
                                        <div className="alert alert-danger">{errors.establishmentEmail}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="establishment_website" className="form-label"><i
                                        className="bi bi-globe"></i> Site web de l'établissement</label>
                                    <input type="text" className="form-control" id="establishment_website"
                                           value={establishmentWebsite}
                                           onChange={(e) => setEstablishmentWebsite(e.target.value)} required/>
                                    {errors.establishmentWebsite &&
                                        <div className="alert alert-danger">{errors.establishmentWebsite}</div>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Créer mon livret d'accueil</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FirstLogin;
