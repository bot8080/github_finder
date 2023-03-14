// import logo from './logo.svg';
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';

import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import './App.css';

class App extends Component {
    state = {
        users: [],
        loading: false, 
        alert: null
    }

    searchUsers = async (text) =>{ 
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({users: res.data.items, loading:false});
    }

    clearData = (text) =>{
        this.setState({ users: [] , loading: false });
    }

    setAlert = (msg, type) => {
        this.setState({ alert: {msg: msg, type: type} });
        setTimeout( ()=> this.setState( {alert:null} ), 3000 );
    }
 
    render() {
        return (
            <div className="App">
                <Navbar title="Github" github_icon="fab fa-github" ></Navbar>
                <div className="container">
                    <Alert alert={this.state.alert}></Alert>
                    <Search searchUsers={this.searchUsers} setAlert={this.setAlert} clearData={this.clearData} showClear={this.state.users.length>0 ? true : false}></Search>
                    <Users loading={this.state.loading} users={this.state.users}></Users>
                </div>
            </div>
        );
    }
}

export default App;
