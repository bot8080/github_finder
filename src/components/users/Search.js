import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    
    const [text, setText] = useState('');

    const onchange = (e) => setText(e.target.value)

    const onSubmit = (e) => {  
        e.preventDefault(); 
        if((text) === "")
        alertContext.setAlert("Please enter something..", "light");
        else
            {
                githubContext.searchUsers(text);
                setText('');
            }   
    }

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" name="email" value={text} onChange={onchange} placeholder='Search Users..'  />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>

            {
                (githubContext.users.length > 0) ?
                <button className="btn btn-danger btn-block" onClick={githubContext.clearData}>Clear data</button>: null
            }
        </div>
    )
}


export default Search