import React, {useState} from 'react';
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Authentification = () => {

    const [openLogin, setOpenLogin] = useState(sessionStorage.getItem('openLogin') === 'true');

    return (
        <div className="p-5">
            {
                openLogin ?
                    <LoginForm setOpenLogin={setOpenLogin}/>
                    :
                    <RegisterForm setOpenLogin={setOpenLogin}/>
            }

        </div>
    );
};

export default Authentification;