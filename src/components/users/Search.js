import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext';

const Search = (props) => {
    const githubContext = useContext(GithubContext);
    
    const [text, setText] = useState('');

    const onchange = (e) => setText(e.target.value)

    const onSubmit = (e) => {  
        e.preventDefault(); 
        if((text) === "")
            props.setAlert("Please enter something..", "light");
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
                (props.showClear) ?
                <button className="btn btn-danger btn-block" onClick={props.clearData}>Clear data</button>: null
            }
        </div>
    )
}

Search.propTypes = {
    clearData : PropTypes.func.isRequired,
    showClear : PropTypes.bool.isRequired,
    setAlert : PropTypes.func.isRequired
}

export default Search