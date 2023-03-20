import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS
} from '../types'

let githubClientId;
let gitHubClientSecret;

if (process.env.NOD_ENV !=='production' ){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
}
else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);


    // Search all users
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${gitHubClientSecret}`);
        // console.log(res)
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // Search specific user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({ type: GET_USER, payload: res.data });
    }

    // Search specific user
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({type: GET_REPOS, payload: res.data});
    }

    //Clear USers
    const clearData = () => dispatch({ type: CLEAR_USERS });

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading, searchUsers, clearData, getUser, getUserRepos
        }
        }>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;