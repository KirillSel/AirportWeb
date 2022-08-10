import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../axios";
import {IAirportDetail} from "../models/models";

export default function AirportDetailPage() {
    const params = useParams<'id'>()
    const [airport, setAirport] = useState<IAirportDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDetailAirport()
    }, [])

    async function fetchDetailAirport() {
        const response = await axios.get<IAirportDetail>(`/airports/${params.id}`)
        setAirport(response.data)
        setLoading(false)
    }

    if (loading) return <p className="text-center">Loading...</p>

    return (
        <div className="container mx-auto pt-5 max-w-[760px]">
            <p className="text-center text-2xl">
                {airport?.name}
            </p>
            <p className="text-center text-2xl">
                {airport?.type}
            </p>
            <p className="text-center text-2xl">
                {airport?.continent}
            </p>
            <p className="text-center text-2xl">
                {airport?.country}
            </p>
            <p className="text-center text-2xl">
                {airport?.region}
            </p>
            <p className="text-center text-2xl">
                {airport?.coordinates}
            </p>
        </div>
    );
};
