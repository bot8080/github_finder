import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext';

const User = () => {
    const githubContext = useContext(GithubContext);

    const { login } = useParams();
    const {getUser, loading, user, getUserRepos, repos} = githubContext;

    useEffect(() => {
        getUser(login);
        getUserRepos(login);
        //eslint-disable-next-line
    }, [login]);

    const { name, avatar_url, location, bio, company, html_url, blog, hireable, followers, following, public_repos, public_gists } = user;

    const [Hireable] = useState(hireable);

    if (loading) return <Spinner/>

    return (
        <>
            <Link to="/" className='btn btn-light'> Back to Search </Link>
            Hireable : { Hireable  ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger'/> }
            <div className="card grid-2">
                <div className='all-center' >
                    <img src={avatar_url} alt="" className="round-img" style={{width:'150px'}} />
                    <h1>{name}</h1>
                    { location && <p>Location: {location}</p> }
                </div>
                <div>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                    <a href={html_url} className="btn btn-dark my-1">Visit Guthub Profile</a>
                    
                    <ul>
                        <li>{login && <><strong>Username:</strong> {login}</>}</li>
                        <li>{company && <><strong>Company:</strong> {company}</>}</li>
                        <li>{blog && <><strong>Website:</strong> {blog}</>}</li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-danger">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>      
            <Repos repos={repos}></Repos>      
        </>
    );
};

export default User;
