import React from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

const Repos = ({ repos }) => {
    // console.log(repos);
    return (
        repos.map(rep => <RepoItem key={rep.id} repo={rep} />)
    )
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default Repos;
