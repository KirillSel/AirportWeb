import {ChangeEvent, useState} from "react";
import useDebounce from "./debounce";
import AirportSearch from "../components/AirportSearch";

interface InputReturn {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function useInput(initialValue = ''):InputReturn {
    const [value, setValue] = useState(initialValue)


    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)

    }

    return {
        value,
        onChange
    }
}