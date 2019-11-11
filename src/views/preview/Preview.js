import React, { Component } from 'react';
import './Preview.scss';
import api from '../../services/api';
import { CircularProgress, LinearProgress } from '@material-ui/core';

class Preview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      feed: {},
      amountEpisodes: null,
      loadingUpdate: false
    };

    this.handleClickUpdate = this.handleClickUpdate.bind(this);

    (async() => {
      const feed = await api.getFeed();
      const amountEpisodes = await api.getDatabase();
      this.setState({ feed: feed, amountEpisodes: amountEpisodes});
    })();
  }

  handleClickUpdate(event) {
    event.preventDefault();
    const { loadingUpdate } = this.state;
    if (!loadingUpdate) {
      this.setState({ loadingUpdate: true});
      this.updateDatabase()
    }
  }

  async updateDatabase() {
    const { feed } = this.state;
      // await api.updateDatabaseInfo(feed);
      await api.updateDatabaseEpisodes(feed);
      const amountEpisodes = await api.getDatabase();
      this.setState({ feed: feed, amountEpisodes: amountEpisodes, loadingUpdate: false});
  }

  render () {
    const { feed, amountEpisodes, loadingUpdate } = this.state;
    return (
      <div className="container">
        <div className="comparation">
          <div className="title"><span>Comparação de dados</span></div>
          <div className="comparation-item">
            <div className="comparation-title"><span>RSS</span></div>
            <div className="comparation-content">
              <span className={ feed && feed.episodes && feed.episodes.length > amountEpisodes ? 'warn' : '' }>{feed && feed.episodes ? feed.episodes.length + ' Episódios' : <CircularProgress />}</span>
            </div>
          </div>
          <div className="comparation-item">
            <div className="comparation-title"><span>Site</span></div>
            <div className="comparation-content">
              <span>{amountEpisodes ? amountEpisodes + ' Episódios' :  <CircularProgress />}</span>
            </div>
          </div>
        </div>

        <div>
          <button className="btn btn-primary btn-update mt-30" onClick={this.handleClickUpdate} 
            disabled={!(feed && feed.episodes) || loadingUpdate}>
            Atualizar
            {
              loadingUpdate ?
              <LinearProgress  />
              : ''
            }
          </button>
        </div>
      </div>
    );
  }
}

export default Preview;
