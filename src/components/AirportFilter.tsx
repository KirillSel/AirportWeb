import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSeletor} from "../hooks/redux";
import {IFilter} from "../models/models";
import {airportSlice} from "../store/slices/airportSlice";

export default function AirportFilter(){
    const dispatch = useAppDispatch()
    const {regions, countries, loading, types} = useAppSeletor(state => state.handbook)
    const [isFilter, setIsFilter] = useState(false)
    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    const clearFilter = () => {
        setFilter({
            type: '',
            country: '',
            region: ''
        })
    }

    const [filter, setFilter] = useState<IFilter>({
        type: '',
        country: '',
        region: ''
    })

    const checkFilter = () => {
        return filter.type || filter.region || filter.country
    }

    useEffect(() => {
        if (checkFilter()) {
            setIsFilter(true)
        } else {
            setIsFilter(false)
        }
        dispatch(airportSlice.actions.filter(filter))
    }, [filter])

    if (loading) return <p className="text-center">Loading...</p>

    return (
        <div className="dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 border-gray-300 rounded-lg border py-2 px-4 mb-4">
            <span className="font-bold mr-2">Filter</span>

            <select name="type" className="mr-2 border py-1 px-2" onChange={changeHandler}
                    value={filter.type}
            >
                <option value="" disabled>Type</option>
                {types.map(t => <option key={t}>{t}</option>)}
            </select>

            <select name="country" className="mr-2 border py-1 px-2" onChange={changeHandler}
                    value={filter.country}
            >
                <option value="" disabled>Country</option>
                {countries.map(c => <option key={c}>{c}</option>)}
            </select>

            <select name="region" className="border py-1 px-2 mr-4" onChange={changeHandler}
                    value={filter.region}
            >
                <option value="" disabled>Region</option>
                {regions.map(r => <option key={r}>{r}</option>)}
            </select>
            {isFilter && <button onClick={clearFilter} className="py-1 px-4 bg-red-700 text-white rounded">&times;</button>}
        </div>
    );
};

