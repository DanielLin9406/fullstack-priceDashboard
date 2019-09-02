import React, { Component } from 'react';
import HelmetLayout from '@app/layout/helmet/HelmetLayout';
import Section, { SectionBody, SectionHeader } from '@app/dump/Section';
import { RedButton } from '@app/dump/Button';
import Panel from '@app/dump/Panel';

export default class Login extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.initAuth();
    }
  }

  render() {
    const { initialized, errMsg } = this.props;
    return (
      <HelmetLayout id="login" title="Login" description="We need to log in.">
        <Section className="login-section">
          <SectionHeader>Sign in to Price Dashboard</SectionHeader>
          <SectionBody isLoading={!initialized} errMsg={errMsg}>
            <Panel>
              <RedButton onClick={this.props.handleLogin()}>
                Sign in with Google
              </RedButton>
            </Panel>
          </SectionBody>
        </Section>
      </HelmetLayout>
    );
  }
}
