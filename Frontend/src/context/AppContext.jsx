import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);


    const getUserData = async () => {
        try {
            const response = await axios.get(backendUrl + "/profile");
            if (response.status === 200) {
                setUserData(response.data);
            } else {
                toast.error("Unable to fetch user data");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again." + err.message);
        }
    }

    /*
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            getUserData();
            setIsLoggedIn(true);
        }
    }, []);
    */

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoggedIn(false);
            setUserData(null);
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getAuthState();
    }, []);


    const contextValue = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
    }

    const getAuthState = async () => {
        try {
            const response = await axios.get(backendUrl + "/is-authenticated");
            if (response.status === 200 && response.data === true) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
            }
        } catch (err) {
            if (err.response) {
                const msg = err.response.data?.message || "Authentication check failed";
                toast.error(msg);
            } else {
                toast.error(err.message);
            }
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);


    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
}