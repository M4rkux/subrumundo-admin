import React, { Component } from 'react';
import './Login.scss';
import logo from '../../assets/icons/subrumundo.svg';
import { login, getToken } from '../../services/auth';
import loadingIcon from '../../assets/icons/logo.svg';
import '../../components/loading/Loading.scss';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = getToken();
    if (token) {
      this.props.history.push('/admin');
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ error: '', loading: true });
    if (!username || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        if (username === 'admin' && password === 'subrunoia') {
          login(JSON.stringify({username, timestamp: new Date().getTime()}));
          this.props.history.push('/admin');
        } else {
          this.setState({
            error: 'Falha ao validar login e senha',
            loading: false
          });
        }
      } catch (error) {
        this.setState({
          error: error,
          loading: false
        });
      }
    }
  }

  render () {
    const {username, password, error, loading} = this.state;

    let showLoading = '';
    if (loading) {
      showLoading = <img className="icon-loading" src={loadingIcon} alt="Ícone de loading" />;
    }

    return (
        <div className="login-wrapper">
          <div className="login-form">
            <img className="home-logo" src={logo} alt="Logo do OMNIA"/>

            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group mb-5">
                    <input type="text" className={`form-control form-control-lg ${error ? 'error' : ''}`}
                    name="username" id="username" spellCheck="false" placeholder="USUÁRIO" onChange={this.handleChange}/>
                </div>
                <div className="form-group mb-5">
                    <input type="password" className={`form-control form-control-lg ${error ? 'error' : ''}`}
                    name="password" id="password" placeholder="SENHA" onChange={this.handleChange}/>
                </div>

                <div className="error-message">{error}</div>

                <button type="submit" className="btn btn-primary btn-lg btn-block btn-login"
                disabled={loading || !username || !password}>
                    <span>ACESSAR</span>
                    {showLoading}
                </button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
