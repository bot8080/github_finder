import React, { Component } from 'react'

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login);
    }
    render() {
        const {name, avatar_url, location, bio, login, html_url, blog} = this.props.user;

        const {loading} = this.props;
        return (
            <>
                <div>{name}, {location}</div>
            </>
        )
    }
}

export default User