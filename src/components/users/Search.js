import React, { useState } from 'react'

export default function Search() {
    const [text, setText] = useState('');

    const onchange = (e) => { setText(e.target.value) }


    return (
        <div>
            <form className='form'>
                <input type="text" name="email" placeholder='Search Users..' value={text} onChange={onchange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
        </div>
    )
}
