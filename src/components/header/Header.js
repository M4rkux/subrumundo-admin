import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Header.scss';
import LogoIcon from '../../assets/icons/subrumundo.svg';
import {ReactComponent as LogoutIcon} from '../../assets/icons/logout.svg';
import { logout } from '../../services/auth';

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
          {this.renderRedirect()}

          <img src={LogoIcon} className="logo-icon" alt="logo" />

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
        </header>
    );
  }
}

export default Header;
