import React, { Component } from 'react';
import HelmetLayout from '@app/layout/helmet/HelmetLayout';
import Section, { SectionBody } from '../../components/Section/Section';
import './Login.scss';

class Login extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.initAuth();
    }
  }

  render() {
    const { initialized } = this.props;
    return (
      <HelmetLayout
        id="login"
        title="Login"
        description="We need to log in to stuff."
      >
        <Section className="login-section">
          {
            <div className="group-container">
              <h2>Sign in to Price Dashboard</h2>
              <SectionBody isLoading={!initialized}>
                <div className="component-group-container">
                  <button
                    className="sign-in-btn"
                    onClick={this.props.handleLogin()}
                  >
                    Sign in
                  </button>
                  <div>{this.props.error}</div>
                </div>
              </SectionBody>
            </div>
          }
        </Section>
      </HelmetLayout>
    );
  }
}

export default Login;
