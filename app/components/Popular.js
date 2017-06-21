import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage(props) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
          key={lang}
          onClick={() => props.onSelect(lang)}
        >
          {lang}
        </li>
      ))}
    </ul>
  );
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) =>
        (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url} target='_blank'>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} starts</li>
            </ul>
          </li>
        )
      )}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RepoGrid.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired
      }).isRequired,
      html_url: PropTypes.string.isRequired,
      stargazers_count: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() =>
      ({
        selectedLanguage: lang,
        repos: null
      })
    );
    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos }));
      });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ?
          <Loading text='LOADING' speed={50} /> :
          <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

module.exports = Popular;
