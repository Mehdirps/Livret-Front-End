/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import SuggestionFilter from "../../components/dashboard/suggestions/SuggestionFilter";
import SuggestionStatusToggle from "../../components/dashboard/suggestions/SuggestionStatusToggle";
import ExportPdfButton from "../../components/dashboard/suggestions/ExportPdfButton";
import SuggestionTable from "../../components/dashboard/suggestions/SuggestionTable";
import SuggestionStats from "../../components/dashboard/suggestions/SuggestionStats";
import SuggestionsSearch from "../../components/dashboard/suggestions/SuggestionsSearch";
import { setError } from '../../stores/slices/livretSlice';
import Loading from "../../components/Loading";


const Suggest = () => {
    const token = useSelector(state => state.user.token);
    const livret = useSelector(state => state.livret.livret);

    const [suggestions, setSuggestions] = useState(null);
    const [suggestionsToFiltered, setSuggestionsToFiltered] = useState([]);

    const [suggestionStats, setSuggestionStats] = useState({ accepted: 0, refused: 0, pending: 0 });
    const [requestSuccess, setRequestSuccess] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/suggestions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.suggestions){
                    setSuggestions(data.suggestions);
                    setSuggestionsToFiltered(data.suggestions);
                    setSuggestionStats({
                        accepted: data.suggestions.filter(s => s.status === 'accepted').length,
                        refused: data.suggestions.filter(s => s.status === 'refused').length,
                        pending: data.suggestions.filter(s => s.status === 'pending').length,
                    });
                    setRequestSuccess(false);
                }else{
                    setSuggestions([]);
                }
            })
            .catch(error => dispatch(setError({ error: error })));
    }, [token,requestSuccess]);

    if(!suggestions) {
        return (
            <Loading />
        );
    }

    return (
        <div className="container">
            <h2 className="mb-4">Mes suggestions</h2>
            <p>Retrouver ici, les suggestions faites par vos visiteurs pour améliorer votre livret.</p>
            <hr />
            <SuggestionsSearch setSuggestions={setSuggestions}/>
            <hr/>
            <SuggestionStatusToggle livret={livret} />
            <hr />
            <ExportPdfButton suggestions={suggestions} />
            <hr/>
            <SuggestionFilter suggestionsToFiltered={suggestionsToFiltered} setSuggestions={setSuggestions} />
            {suggestions.length > 0 ?
                <>
                    <hr />
                    <SuggestionStats stats={suggestionStats} />
                    <SuggestionTable suggestions={suggestions} setRequestSuccess={setRequestSuccess} />
                </>
                : (
                    <div className="alert alert-warning" role="alert">
                        Aucune suggestion pour le moment
                    </div>

            )}
        </div>
    );
};

export default Suggest;
