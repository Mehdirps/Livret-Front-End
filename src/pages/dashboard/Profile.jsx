import React from 'react';
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import UserProfileForm from "../../components/dashboard/UserProfileForm";
import LivretProfileForm from "../../components/dashboard/LivretProfileForm";

const Profile = () => {
    const user = useSelector(state => state.user.user);
    /*const successMessage = useSelector(state => state.messages.success);
    const errorMessage = useSelector(state => state.messages.error);*/

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
                    {/*{successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}*/}
                    <UserProfileForm/>
                    <hr/>
                    <LivretProfileForm/>
                </div>
            </div>
        </div>
    );
};

export default Profile;
