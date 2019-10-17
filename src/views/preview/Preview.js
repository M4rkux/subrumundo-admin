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
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <div>
                  <span>Comparação de dados</span>
                </div>
              </th>
            </tr>
            <tr>
              <th><span>RSS</span></th>
              <th><span>Site</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="updated-col">
                {feed && feed.episodes ? feed.episodes.length + ' Episódios' : <CircularProgress />}
              </td>
              <td className="updated-col">
                {amountEpisodes ? amountEpisodes + ' Episódios' :  <CircularProgress />}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button className="btn btn-primary btn-update" onClick={this.handleClickUpdate} 
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
