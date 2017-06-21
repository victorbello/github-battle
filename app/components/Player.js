import React from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <PlayerPreview avatar={props.profile.avatar_url} username={props.profile.login}>
        <ul className='space-list-items'>
          {props.profile.name && <li>{props.profile.name}</li>}
          {props.profile.location && <li>{props.profile.location}</li>}
          {props.profile.company && <li>{props.profile.company}</li>}
          <li>Followers: {props.profile.followers}</li>
          <li>Following: {props.profile.following}</li>
          <li>Public Repos: {props.profile.public_repos}</li>
          {props.profile.blog && <li><a href={props.profile.blog}>{props.profile.blog}</a></li>}
        </ul>
      </PlayerPreview>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isOptional,
    company: PropTypes.string.isOptional,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
    blog: PropTypes.string.isRequired,
  }).isRequired
};

module.exports = Player;
