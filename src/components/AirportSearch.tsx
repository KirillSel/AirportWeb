import React, {useEffect, useState} from 'react';
import {useInput} from "../hooks/input";
import useDebounce from "../hooks/debounce";
import axios from "../axios";
import {IAirport, ServerResponse} from "../models/models";
import {useNavigate} from "react-router-dom";



export default function AirportSearch() {
    const navigate = useNavigate()
    const input = useInput()
    const [drop, setDrop] = useState(false)
    const [airports, setAirports] = useState<IAirport[]>([])
    const debounced = useDebounce<string>(input.value)

    async function searchAirports() {
        const response = await axios.get<ServerResponse<IAirport>>(`airports`, {params: {search: debounced, count: 10}})
        setAirports(response.data.results)
    }

    useEffect(() => {
        if (debounced.length > 3)  {
            searchAirports().then(() => setDrop(true))
        } else {
            setDrop(false)
        }

    }, [debounced])

    return (
        <div className="mb-4 relative">

            <input
                type='text'
                className="focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border bg-gray-50 border-gray-300 rounded-lg py-2 px-4 mb-4 outline-0 w-full h-[42px]"
                placeholder="Type something..."
                {...input}
            />

            {drop && <ul className="list-none absolute left-0 right-0 h-[200px] top-[42px] shadow-md overflow-y-scroll bg-white">
                {
                    airports.map(airport => (
                        <li className="mb-2 py-2 px-4 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-white"
                            key={airport.id}
                            onClick={() => navigate(`/airport/${airport.id}`)}
                        >
                            {airport.name}
                        </li>
                    ))
                }
            </ul>}
        </div>
    );
}

