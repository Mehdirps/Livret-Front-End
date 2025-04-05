/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useState } from 'react';
import Error from '../Error';
import Success from '../Success';
import { Link, NavLink } from 'react-router-dom';

const RegisterForm = ({ setOpenLogin }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [etablissementType, setEtablissementType] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [etablissementTypeError, setEtablissementTypeError] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = () => {

        setError("");

        fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                etablissement_type: etablissementType
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess(data.success);
                    setError("");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setEtablissementType("");

                    setTimeout(() => {
                        setOpenLogin(true)
                    }, 5000);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="container">
            <h2 className="text-center">Inscription</h2>
            {
                error ?
                    <Error error={error} /> :
                    null
            }
            {
                success ?
                    <Success success={success} /> :
                    null
            }
            <form onSubmit={(e) => {
                e.preventDefault();
                if (firstName === "") {
                    setFirstNameError("Le nom est obligatoire");
                    return;
                } else {
                    setFirstNameError("");
                }
                if (lastName === "") {
                    setLastNameError("Le prénom est obligatoire");
                    return;
                } else {
                    setLastNameError("");
                }
                if (email === "") {
                    setEmailError("L'adresse e-mail est obligatoire");
                    return;
                } else {
                    setEmailError("");
                }
                if (password === "") {
                    setPasswordError("Le mot de passe est obligatoire");
                    return;
                } else {
                    setPasswordError("");
                }
                if (etablissementType === "") {
                    setEtablissementTypeError("Le type d'établissement est obligatoire");
                    return;
                } else {
                    setEtablissementTypeError("");
                }

                const minLength = 8;
                const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
                const numberRegex = /\d/;
                const upperCaseRegex = /[A-Z]/;
                const lowerCaseRegex = /[a-z]/;

                if (password.length < minLength) {
                    setPasswordError(`Le mot de passe doit contenir au moins ${minLength} caractères`);
                    return;
                } else if (!specialCharRegex.test(password)) {
                    setPasswordError("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?\":{}|<>)");
                    return;
                } else if (!numberRegex.test(password)) {
                    setPasswordError("Le mot de passe doit contenir au moins un chiffre");
                    return;
                } else if (!upperCaseRegex.test(password)) {
                    setPasswordError("Le mot de passe doit contenir au moins une lettre majuscule");
                    return;
                } else if (!lowerCaseRegex.test(password)) {
                    setPasswordError("Le mot de passe doit contenir au moins une lettre minuscule");
                    return;
                }

                if (confirmPassword === "" || confirmPassword !== password) {
                    setConfirmPasswordError("La confirmation du mot de passe est obligatoire et doit être identique au mot de passe");
                    return;
                } else {
                    setConfirmPasswordError("");
                }

                handleSubmit();
            }}>
                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="first_name" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="first_name" onChange={(e) => {
                            setFirstName(e.target.value);
                        }} value={firstName} />
                        {
                            firstNameError !== "" ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {firstNameError}
                                </div>
                                : null
                        }
                    </div>
                    <div className="col-6">
                        <label htmlFor="last_name" className="form-label">Prénom</label>
                        <input type="text" className="form-control" id="last_name" onChange={(e) => {
                            setLastName(e.target.value);
                        }} value={lastName} />
                        {
                            lastNameError !== "" ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {lastNameError}
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Votre adresse e-mail</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} value={email} />
                    {
                        emailError !== "" ?
                            <div className="alert alert-danger mt-2" role="alert">
                                {emailError}
                            </div>
                            : null
                    }
                </div>
                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => {
                            setPassword(e.target.value);
                        }} value={password} />
                        {
                            passwordError !== "" ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {passwordError}
                                </div>
                                : null
                        }
                    </div>
                    <div className="col-6">
                        <label htmlFor="password_confirmation" className="form-label">Confirmer votre mot de
                            passe</label>
                        <input type="password" className="form-control" id="password_confirmation"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }} value={confirmPassword} />
                        {
                            confirmPasswordError !== "" ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {confirmPasswordError}
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="etablissement_type" className="form-label">Type d'établissement</label>
                    <select className="form-select" id="etablissement_type" onChange={(e) => {
                        setEtablissementType(e.target.value);
                    }}>
                        <option selected disabled>-- Choisir un type d'établissement --</option>
                        <option value="1">Etablissement 1</option>
                        <option value="2">Etablissement 2</option>
                        <option value="3">Etablissement 3</option>
                    </select>
                    {
                        etablissementTypeError !== "" ?
                            <div className="alert alert-danger mt-2" role="alert">
                                {etablissementTypeError}
                            </div>
                            : null
                    }
                </div>
                <p className="text-secondary">En vous inscrivant, vous acceptez nos <Link to="/cgu" target='_blank' className="text-primary">Conditions d'utilisation</Link> et notre <Link to="/politique" target='_blank' className="text-primary">Politique de confidentialité</Link>.</p>
                <p className="text-secondary">Vous recevrez un e-mail de validation de votre compte. Pensez à vérifier vos spams.</p>
                <button type="submit" className="btn btn-primary mt-3">M'inscrire</button>
            </form>
            <p className="text-center mt-3 text-secondary" style={{ cursor: "pointer" }} onClick={() => {
                setOpenLogin(true);
                sessionStorage.setItem('openLogin', true);
            }}>Déjà un compte ? Connectez-vous</p>
        </div>
    );
};

export default RegisterForm;
