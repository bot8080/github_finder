import React from 'react'
import PropTypes from 'prop-types'

const Navbar = (props) => {
        return (
            <nav className='navbar bg-primary'>
                <h1> <i className={props.github_icon}></i> {props.title}</h1>
            </nav>
        )
    }

Navbar.defaultProps = {
    title: 'Github Finder',
    github_icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    github_icon: PropTypes.string.isRequired
}

export default Navbar