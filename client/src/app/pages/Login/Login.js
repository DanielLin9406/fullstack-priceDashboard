import React, { Component } from 'react'
import ReactLoading from 'react-loading'
;
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
          <div className="loading-container">
            <ReactLoading type="spin" color='#ccc' height={50} width={50} /> 
          </div>
        )}
      </section>
    )    
  }
}

export default Login;