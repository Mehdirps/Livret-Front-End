import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Loading from "../../components/Loading";
import StatsCard from "../../components/dashboard/StatsCard";
import StatsBetweenDatesForm from "../../components/dashboard/StatsBetweenDatesForm";
import ExportStats from "../../components/dashboard/ExportStats";
import { setError } from '../../stores/slices/livretSlice';

const Stats = () => {
    const token = useSelector(state => state.user.token);
    const [statsDatas, setStatsDatas] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}dashboard/stats/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then(data => {
                setStatsDatas(data);
            })
            .catch((error) => {
                dispatch(setError({ error: error }));
            });
    }, []);

    return (
        <>
            {
                statsDatas ?
                    <div>
                        <div className="container">
                            <h2 className="mb-4">Statistiques des vues de livret</h2>
                            <p>Retrouvez ici les statistiques des vues de votre livret</p>
                            <hr/>
                            <ExportStats data={statsDatas}/>
                            <p>Exporter en PDF les statistiques de vues de votre livret</p>
                            <hr/>
                            <div className="row">
                                <StatsCard data={statsDatas.totalViews} bgColor={'primary'} title={'Total des vues'}/>
                                <StatsCard data={statsDatas.viewsToday} bgColor={'danger'} title={'Vus du jour'}/>
                                <StatsCard data={statsDatas.viewsThisWeek} bgColor={'success'}
                                           title={'Vus de la semaine'}/>
                                <StatsCard data={statsDatas.viewsThisMonth} bgColor={'warning'} title={'Vus du mois'}/>
                            </div>
                            <hr/>
                            <StatsBetweenDatesForm/>
                        </div>
                    </div>

                    : <Loading/>
            }
        </>
    );
};

export default Stats;
