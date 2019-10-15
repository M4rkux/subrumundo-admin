import React, { Component } from 'react';
import loadingIcon from '../../assets/icons/logo.svg';
import './Loading.scss';

class Loading extends Component {
  render () {
    return (
      <div className="loading-wrapper">
        <img className="icon-loading" src={loadingIcon} alt="Ícone de loading" />
        <div className="msg-loading">
          <p>Essa pesquisa pode demorar alguns minutos.</p>
          <p>Por favor aguarde…</p>
        </div>
      </div>
    );
  }

}

export default Loading;
