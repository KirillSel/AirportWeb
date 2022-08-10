import {IAirport, IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HandbookState {
    loading: boolean,
    types: IAirportType[],
    regions: IAirportRegion[],
    countries: IAirportCountry[]

}

interface HandbookPayload {
    types: IAirportType[]
    countries: IAirportCountry[]
    regions: IAirportRegion[]
}

const initialState: HandbookState = {
    loading: false,
    types: [],
    regions: [],
    countries: []
}


export const handbookSlice = createSlice({
    name: 'handbook',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSucces(state, action: PayloadAction<HandbookPayload>) {
            state.loading = false
            state.types = action.payload.types
            state.regions = action.payload.regions
            state.countries = action.payload.countries
        }


    }
})

export default handbookSlice.reducer