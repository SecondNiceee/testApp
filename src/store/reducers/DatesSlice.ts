import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDate } from "../../models/IDate";
import axios from "axios";


interface IInitial {
    isLoading : boolean,
    dates : IDate[]
}

interface IPost {
    date : Omit<IDate, "id">,
    token : string
}

interface IDelete {
    id : string,
    token : string
}

interface IPutDate {
    id : string,
    token : string,
    date : Omit<IDate, "id">,
}

const initialState:IInitial = {
    isLoading : false,
    dates : []
} 

const HOST = process.env.REACT_APP_HOST


export const putDate = createAsyncThunk(
    "putDate",
    async function ({id, token , date}:IPutDate) {
        const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, date, {
            headers : {
                "x-auth" : token,
                'Content-Type': 'application/json'
            }
        })
        console.log(date)
        console.log(response.data)
        return response.data.data
        
    }
)
export const deleteDate = createAsyncThunk(
    "deleteDate",
    async function ({id, token}:IDelete) {
        await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {}, {
            headers : {
                "x-auth" : token,
                'Content-Type': 'application/json'
            }
        } )
        return id
    }
)

export const fetchDates = createAsyncThunk( 
    "getDates",
    async function (userToken:string) {
        const response = await axios.get(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
            headers : {
                "x-auth" : userToken,
                'Content-Type': 'application/json'
            }
        })
        return response.data.data as IDate[]
    }
 )

 export const postDates = createAsyncThunk(
    "postDate",
    async function name({date, token} : IPost) {
        const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, date, {
            headers : {
                "x-auth" : token,
                'Content-Type': 'application/json'

            }
        })
        console.log(response.data.data)
        return response.data.data
    }
 )
const DatesSlice = createSlice({
    name : "DatesSlice",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase( fetchDates.pending , (state) => {
            state.isLoading = true
        } )
        builder.addCase( fetchDates.fulfilled , (state, action) => {
            state.isLoading = false
            state.dates = action.payload
        } )
        builder.addCase( postDates.pending , (state, action) => {
            state.isLoading = true
        } )
        builder.addCase( postDates.fulfilled , (state, action) => {
            state.isLoading = false
            state.dates.push(action.payload)
        } )
        builder.addCase(deleteDate.fulfilled, (state, action) => {
            state.dates = state.dates.filter(e => e.id !== action.payload)
        } )
        builder.addCase( putDate.fulfilled, (state, action) => {
            state.dates = state.dates.map(e => e.id === action.payload.id ? action.payload : e)
        } )
        
    }
} )

export default DatesSlice.reducer