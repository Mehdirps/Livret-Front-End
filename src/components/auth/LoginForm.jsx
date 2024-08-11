import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {clearUser, setUser} from "../../stores/slices/userSlice";
import {useNavigate} from "react-router-dom";
import Error from "../Error";

const LoginForm = ({setOpenLogin}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (email === "" || password === "") {
            alert("Veuillez remplir tous les champs");
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    dispatch(clearUser());
                    return;
                } else {
                    dispatch(setUser({user: data.user, token: data.token}));

                    if (data.first_login) {
                        navigate('/dashboard/premiere_connexion');
                    } else {
                        navigate('/dashboard');
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="container">
            <h2 className="text-center">Connexion</h2>
            {
                error ?
                    <Error error={error}/>    
                :
                    null
            }
            <form className="col-6 mx-auto" onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Votre adresse e-mail</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}
                           required defaultValue={email}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <div id="passwordHelp" className="form-text">Écrivez votre mot de passe à l'abri des regards et ne
                        le partagez jamais.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Me connecter</button>
            </form>
            <p className="text-center mt-3 text-secondary" style={{cursor: "pointer"}} onClick={() => {
                setOpenLogin(false);
                localStorage.setItem('openLogin', false);
            }}>Pas encore de compte ? Inscrivez-vous</p>
        </div>
    );
};

export default LoginForm;