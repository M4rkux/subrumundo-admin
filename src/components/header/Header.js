import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './Header.scss';
import LogoIcon from '../../assets/icons/subrumundo.svg';
import {ReactComponent as LogoutIcon} from '../../assets/icons/logout.svg';
import { logout } from '../../services/auth';
import { ListItem, ListItemText } from '@material-ui/core';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }

    this.logOut = this.logOut.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  async logOut(event) {
    event.preventDefault();
    logout();
    this.setRedirect();
  }


  render () {

    const { title } = this.props;

    return (
        <header className="App-header">
          <div>
            {this.renderRedirect()}
            <a href="/">
              <img src={LogoIcon} className="logo-icon" alt="logo" />
            </a>

            <div className="title-header">
              {title}
            </div>

            <div className="d-flex">
              <button className="btn btn-secondary btn-logout" onClick={this.logOut} title="Sair">
                <div className="m-auto">
                  <span>Sair</span>
                  <LogoutIcon />
                </div>
              </button>
            </div>
          </div>
          <div>
            <ul className="menu" >
                <li>
                  <ListItem button component={NavLink} to="/admin" activeClassName="active">
                    <ListItemText primary="Home" />
                  </ListItem>
                </li>
                <li>
                  <ListItem button component={NavLink} to="/episodios" activeClassName="active">
                    <ListItemText primary="Episódios" />
                  </ListItem>
                </li>
                <li>
                  <ListItem button component={NavLink} to="/patroes" activeClassName="active">
                    <ListItemText primary="Patrões" />
                  </ListItem>
                </li>
            </ul>

          </div>
        </header>
    );
  }
}

export default Header;
