import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading';
import './Login.scss';

class Login extends Component {
  componentDidMount() {
    !this.props.initialized && this.props.initAuth()
  }

  render(){
    return (
      <section className="login-section">
        {this.props.initialized && (
          <div className="group-container">
            <h2>Sign in to Price Dashboard</h2>
            <div className="component-group-container">
              <button 
                className="sign-in-btn"
                onClick={this.props.handleLogin()}
              >Sign in</button>
              <div>
                {this.props.error}
              </div>
            </div>
          </div>
        ) || (
          <Loading />
        )}
      </section>
    )    
  }
}

export default Login;