import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './views/login/Login';
import { isAuthenticated } from "./services/auth";
import Header from "./components/header/Header";
import Preview from "./views/preview/Preview";
import Footer from "./components/footer/Footer";
import './App.scss';
import Episodes from "./views/episodes/Episodes";
import Patrons from "./views/patrons/Patrons";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <div className="App">
          <div className="loggedIn">
            <Header />
            <Component {...props} />
            <Footer />
          </div>
        </div>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
        <PrivateRoute path="/admin" component={Preview} />
        <PrivateRoute path="/episodios" component={Episodes} />
        <PrivateRoute path="/patroes" component={Patrons} />
      <Route path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
)};

export default Routes;