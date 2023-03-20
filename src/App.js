import React from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App = () => {

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar title="Github" github_icon="fab fa-github" ></Navbar>
                        <div className="container">
                            <Alert ></Alert>
                            <Routes>
                                <Route exact path="/" element={<Home/>}>
                                </Route>

                                <Route exact path="/about" element={<About />}>
                                </Route>

                                <Route exact path="/user/:login" element={< User />}>
                                </Route>

                                <Route exact path="*" element={<NotFound />}></Route>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );

}

export default App;
