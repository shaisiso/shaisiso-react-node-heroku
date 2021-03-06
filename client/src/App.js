import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import LoginForm from './components/LoginForm'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import HeaderSign from './components/HeaderSign';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      logged: false
    }
  }
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }


  getNav = () => {
    if (this.state.logged === false) {
      return (
        <HeaderSign />
      )
    }
    else return (<div />)
  }
  handleLogin = () => {
    this.setState({ logged: true })
  }
  handleLogout = ()=>{
    this.setState({logged:false})
  }

  render() {
    return (
      <Router>
        <div className="App ">
          {this.getNav()}
          <Routes>

            <Route
              exact path="/"
              element={this.state.logged === true ?
                <Navigate to="/dashboard" />
                :
                <Navigate to="/sign-in" />
              }
            />
            <Route
              path="/sign-in"
              element={this.state.logged === true ?
                <Navigate to="/dashboard" />
                :
                <LoginForm handleLogin={this.handleLogin} />
              }
            />
            <Route
              path="/sign-up"
              element={this.state.logged === true ? <Navigate to="/dashboard" /> : <CreateUser />}
            />
            <Route
              path="/forgot-password"
              element={this.state.logged === true ? <Navigate to="/dashboard" /> : <ForgotPassword />}
            />
            <Route
              path="/dashboard"
              element={this.state.logged === false ? <Navigate to="/sign-in" /> : <Dashboard handleLogout={this.handleLogout}/>}
            />
          </Routes>
          {
            this.state.logged === false ?
              <Footer />
              :
              <div />
          }
        </div>
      </Router>
    );
  }
}
export default App