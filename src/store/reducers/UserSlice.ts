import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"


interface UserState {
    isAuth : boolean,
    error : boolean,
    userToken : string
}


interface IFethc  {
    password : string,
    username : string,
}

const initialState:UserState = {
    isAuth : false,
    error : false,
    userToken : ""
}

const HOST = process.env.REACT_APP_HOST

export const fetchAuth = createAsyncThunk(
    "createAsyncThunk",
    async function (params:IFethc) {
        try{

            const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/login`, params, {
                headers: {
                    'Content-Type': 'application/json',
                    }
            })
            console.log(response.data)
            return response.data
        }
        catch(e){
            alert(JSON.stringify(e))
        }
    }
)

export const userSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        changeAuth(state, action:PayloadAction<boolean>){
            state.isAuth = action.payload
        },
        changeToken(state, action:PayloadAction<string>){
            state.userToken = action.payload
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchAuth.rejected , () => {alert("Что - то пошло совсем не так!")})
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            if (action.payload.error_message === "OK"){
                state.userToken = action.payload.data.token
                state.isAuth = true
                state.error = false
            }
            else{
                state.isAuth = false
                state.error = true
            }
        })
    }
})

export const {changeAuth, changeToken} = userSlice.actions
export default userSlice.reducer