import React from 'react';
import {IAirport} from "../models/models";
import classes from './AirportCard.module.css'
import {useNavigate} from "react-router-dom";

interface AirportCardProps {
    airport: IAirport
}

export default function AirportCard({airport}: AirportCardProps){
    const navigate = useNavigate()
    const clickHandler = () => navigate(`/airport/${airport.id}`)

    return (
        <div className={classes.card} onClick={clickHandler}>
            <p className="text-lg font-bold">{airport.name}</p>
            <p>{airport?.region}</p>
            <p>{airport?.type}</p>
            <p>{airport?.country}</p>
            <p>{airport?.local_code}</p>
            <p>{airport?.ident}</p>
        </div>
    );
};

