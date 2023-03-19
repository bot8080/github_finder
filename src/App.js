import React, { Fragment, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';
import GithubState from './context/github/githubState';

const App = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);


    // Search specific user
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    }

    // Search specific user
    const getUserRepos = async (username) => {
        setLoading(true);
        // console.log("HERE");
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
        setLoading(false);
    }

    // Clear data from page
    const clearData = () => {
        setUsers([]);
        setLoading(false);
    }

    // Alert popup from 
    const showAlert = (msg, type) => {
        setAlert({ msg: msg, type: type });
        setTimeout(() => setAlert(null), 3000);
    }
    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar title="Github" github_icon="fab fa-github" ></Navbar>
                    <div className="container">
                        <Alert alert={alert}></Alert>
                        <Routes>
                            <Route exact path="/" element={
                                <Fragment>
                                    <Search setAlert={showAlert} clearData={clearData} showClear={users.length > 0 ? true : false} ></Search>
                                    <Users loading={loading} users={users} ></Users>
                                </Fragment>
                            }>
                            </Route>

                            <Route exact path="/about" element={<About />}>
                            </Route>

                            <Route exact path="/user/:login" element={< User getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />}>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </GithubState>
    );

}

export default App;
