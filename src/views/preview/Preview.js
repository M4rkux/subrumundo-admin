import React, { Component } from 'react';
import './Preview.scss';
import api from '../../services/api';

class Preview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      feed: {},
      database: {},
      loadingUpdate: false
    };

    this.updateDatabase = this.updateDatabase.bind(this);
  }

  async componentWillMount() {
    const feed = await api.getFeed();
    const database = await api.getDatabase();
    this.setState({ feed: feed, database: database});
  }

  async updateDatabase(event) {
    event.preventDefault();
    const { feed, loadingUpdate } = this.state;
    if (!loadingUpdate) {
      this.setState({ loadingUpdate: true});
      await api.updateDatabase(feed);
      const database = await api.getDatabase();
      this.setState({ feed: feed, database: database, loadingUpdate: false});
    }
  }

  render () {
    const { feed, database, loadingUpdate } = this.state;
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
              <td className="updated-col">{feed && feed.episodes ? feed.episodes.length : 0} Episódios</td>
              <td className="updated-col">{database && database.episodes ? database.episodes.length : 0} Episódios</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button className="btn btn-primary" onClick={this.updateDatabase} disabled={loadingUpdate}>
            Atualizar
          </button>
        </div>
      </div>
    );
  }
}

export default Preview;
