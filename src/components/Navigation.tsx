import React from 'react';
import {Link} from "react-router-dom";
import {useAppSeletor} from "../hooks/redux";
import {useDispatch} from "react-redux";
import {authSlice} from "../store/slices/authSlice";

export default function Navigation(){
    const {isAuth, username} = useAppSeletor(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        dispatch(authSlice.actions.logout())
    }

    return (
        <nav className="flex justify-between px-5 h-[50px] bg-gray-200 items-center shadow-md">
            <Link to="/">Airport</Link>

            {!isAuth && <Link to="/auth">Auth</Link>}

            {isAuth && <>
                <span className="font-bold">{username}</span>
                <a href="#" onClick={logoutHandler}>Logout</a>
            </>}
        </nav>
    );
};

