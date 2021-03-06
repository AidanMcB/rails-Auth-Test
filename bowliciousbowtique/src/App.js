import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './containers/Navbar';
import Home from './components/Home';
import ProductContainer from './components/ProductContainer';
import TestimonialsContainer from './components/TestimonialsContainer.js';
// import Cart from './components/Cart';
import Footer from './containers/Footer';
import Default from './components/Default';
import Test from './components/Test.js';

// Testing
import Dashboard from './components/temp-study/Dashboard.jsx';
import SignUp from './components/auth/SignUp.jsx';
import LogIn from './components/auth/LogIn.jsx';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogOut = () => {
    // switched this axios method to a fetch to include credentials
    // withCredentials: true wasnt working for some reason
    //ALSO as you said, rails as API can not run session
    //I changed the config/application.rb to have 
    //  config.api_only = false
    //instead of   config.api_only = true
    console.log("logout function")
    fetch("http://localhost:3000/logout",{
        method: 'POST',
        credentials: 'include'
      })
      .then(res => {
        console.log(res)
      })
      .then(resp => {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      })
  }

  checkLoginStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        console.log(response);
        if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })
      .catch(error => { console.log(error) })
  }

  handleLogin = (data) => {
    console.log("LOGIN CATCH", data);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/signup" render={props => (
              <SignUp
                {...props} /* <-- we want to NOT manipulate props, but add to them */
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.loggedInStatus}
              />
            )} />

            <Route exact path="/login" render={props => (
              <LogIn
                {...props} /* <-- we want to NOT manipulate props, but add to them */
                handleLogin={this.handleLogin}
                handleLogOut={this.handleLogOut}
                loggedInStatus={this.state.loggedInStatus}
              />
            )} />

            <Route exact path="/dashboard" render={props => (
              <Dashboard
                {...props}
                state={this.state}
              />
            )} />
            <Route exact path="/" component={Home} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/testimonials" component={TestimonialsContainer} />
            <Route exact path="/products" component={ProductContainer} />
            <Route component={Default} />
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}
