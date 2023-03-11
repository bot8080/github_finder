import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
    state = {
        users:
            [
                {
                    login: "mojombo",
                    id: 1,
                    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
                    url: "https://api.github.com/users/mojombo",
                    html_url: "https://github.com/mojombo",
                    site_admin: false
                },
                {
                    login: "defunkt",
                    id: 2,
                    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
                    url: "https://api.github.com/users/defunkt",
                    html_url: "https://github.com/defunkt",
                    site_admin: false
                },
                {
                    login: "pjhyett",
                    id: 3,
                    avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
                    url: "https://api.github.com/users/pjhyett",
                    html_url: "https://github.com/pjhyett",
                    site_admin: false
                }
            ]
    }

    render() {
        return (
            <div style={userstyle}>
                {this.state.users.map((user)=> 
                    (<UserItem key={user.id} user={user}></UserItem>)
                )}
            </div>
        )
    }
}

const userstyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users