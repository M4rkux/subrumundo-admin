import React, { Component } from 'react';
import './App.scss';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Preview from './views/preview/Preview';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      title: null
    }

    this.setTitle = this.setTitle.bind(this);
  }

  setParams(params) {
    this.setState({params: params});
  }

  setTitle(title) {
    this.setState({title: title});
  }

  render () {

    const { title } = this.state;

    return (
      <div className="App">
        <div className="loggedIn">
          <Header removeParams={this.removeParams} title={title}/>
          <Preview setTitle={this.setTitle} />
          <Footer/>
        </div>     
      </div>
    );
  }
}

export default App;
