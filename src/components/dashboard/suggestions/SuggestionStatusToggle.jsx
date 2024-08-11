import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setLivret} from "../../../stores/slices/livretSlice";
import { setError, setSuccess } from "../../../stores/slices/livretSlice";

const SuggestionStatusToggle = ({livret}) => {

    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const handleToggle = () => {
        fetch(`${process.env.REACT_APP_API_URL}dashboard/suggestion/enable/${livret.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(setLivret({livret: data.livret}));
                dispatch(setSuccess({success: data.message}));
            })
            .catch(error => dispatch(setError({error: error})));
    }

    return (
        <div>
            {!livret.suggest ? (
                <div>
                    <div className="alert alert-warning" role="alert">
                        Les suggestions ne sont pas activées sur votre livret
                    </div>
                    <div className="btn btn-primary" onClick={() => handleToggle()}>
                        Activer les suggestions
                    </div>

                </div>
            ) : (
                <div>
                    <div className="alert alert-success" role="alert">
                        Les suggestions sont activées sur votre livret
                    </div>
                    <div className="btn btn-danger" onClick={() => handleToggle()}>
                        Désactiver les suggestions
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestionStatusToggle;