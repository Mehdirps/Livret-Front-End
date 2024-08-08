import React from "react";

const SuggestionTable = ({ suggestions }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Message</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {suggestions.map(suggestion => (
                    <tr data-status={suggestion.status} className="tr_data">
                        <td>{suggestion.name}</td>
                        <td>{suggestion.email}</td>
                        <td>{suggestion.title}</td>
                        <td>{suggestion.message}</td>
                        <td>
                            <form action={`${process.env.REACT_APP_API_URL}/dashboard/suggestion/status`} method="post">
                                <select name="status_suggest" id="status_suggest"
                                        className="form-control status_suggest">
                                    <option value="pending" selected={suggestion.status === 'pending'}>En attente
                                    </option>
                                    <option value="accepted" selected={suggestion.status === 'accepted'}>Accepté
                                    </option>
                                    <option value="refused" selected={suggestion.status === 'refused'}>Refusé</option>
                                </select>
                                <input type="hidden" name="suggestion_id" value={suggestion.id}/>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuggestionTable;