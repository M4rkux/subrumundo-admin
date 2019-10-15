import React, { Component } from 'react';
import './Footer.scss';
// import logoOmnia from '../../assets/icons/logo-omnia-branco-footer.svg';
import pjson from '../../../package.json';

class Footer extends Component {
  render () {
    return (
      <footer>
        <span className="version">v{pjson.version}</span>
        <span>Desenvolvido por <strong>Marcus</strong></span>
        {/* <img src={logoOmnia} alt="Logo do OMNIA"/> */}
      </footer>
    );
  }
}

export default Footer;
