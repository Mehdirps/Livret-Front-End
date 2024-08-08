import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import SuggestionForm from "../../components/dashboard/SuggestionForm";
import SuggestionStatusToggle from "../../components/dashboard/SuggestionStatusToggle";
import ExportPdfButton from "../../components/dashboard/ExportPdfButton";
import SuggestionTable from "../../components/dashboard/SuggestionTable";
import SuggestionStats from "../../components/dashboard/SuggestionStats";


const Suggest = () => {
    const token = useSelector(state => state.user.token);
    const livret = useSelector(state => state.livret.livret);

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionStats, setSuggestionStats] = useState({ accepted: 0, refused: 0, pending: 0 });
    const [requestSuccess, setRequestSuccess] = useState(false)

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
                setSuggestions(data.suggestions);
                setSuggestionStats({
                    accepted: data.suggestions.filter(s => s.status === 'accepted').length,
                    refused: data.suggestions.filter(s => s.status === 'refused').length,
                    pending: data.suggestions.filter(s => s.status === 'pending').length,
                });
                setRequestSuccess(false);
            })
            .catch(error => console.error(error));
    }, [token,requestSuccess]);

    return (
        <div className="container">
            <h2 className="mb-4">Mes suggestions</h2>
            <SuggestionForm />
            <hr />
            <SuggestionStatusToggle livret={livret} />
            <hr />
            <ExportPdfButton />
            {suggestions.length > 0 && (
                <>
                    <hr />
                    <SuggestionStats stats={suggestionStats} />
                    <SuggestionTable suggestions={suggestions} setRequestSuccess={setRequestSuccess} />
                </>
            )}
        </div>
    );
};

export default Suggest;