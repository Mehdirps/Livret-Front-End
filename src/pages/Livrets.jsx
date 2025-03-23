import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Livrets = () => {

    const [livrets, setLivrets] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}livrets`)
            .then(response => response.json())
            .then(data => {
                setLivrets(data.livrets);
            })
            .catch(error => {
                console.error('Erreur', error);
            })
    }, [])

    return (
        <main>
            <Helmet>
                <title>Liste des livrets</title>
                <meta name="description" content="Liste des livrets de Heberginfos" />
            </Helmet>
            <div className="container">
                <h1>Liste des livrets</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Nom du livret</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livrets.map(livret => (
                                <tr key={livret.id}>
                                    <td>
                                        {livret.logo && 
                                            <img 
                                                src={`${process.env.REACT_APP_URL}${livret.logo}`} 
                                                alt={livret.title} 
                                                style={{width:'50px'}} 
                                            />
                                        }
                                    </td>
                                    <td>{livret.livret_name}</td>
                                    <td>{livret.description}</td>
                                    <td>
                                        <a href={`/livret/${livret.slug}/${livret.id}`} className="btn btn-primary btn-sm">
                                            Voir le livret
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Livrets;