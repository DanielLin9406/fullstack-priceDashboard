import React, { Component } from 'react';
import Section, { SectionHeader } from '@app/dump/Section';

import './UserSection.scss';

// const COLORS = [
//   '#0c4245',
//   '#20384c',
//   '#5eb861',
//   '#869a8d',
//   '#90989b',
//   '#a0b9cc',
//   '#b69528',
//   '#cd534e'
// ];

// const randomColorByText = text =>
//   COLORS[parseInt(text.charCodeAt(text.length - 1), 10) % COLORS.length];

class UserSection extends Component {
  render() {
    return (
      <Section className="user-section">
        <SectionHeader>User Section</SectionHeader>
        <div className="component-group-container">
          <div className="user-avatar-con">
            <div className="user-avatar">
              <p>{this.props.user.name.charAt(0)}</p>
            </div>
          </div>
          <div className="user-name">
            <p>{this.props.user.name}</p>
          </div>
          <button className="logout-btn" onClick={this.props.handleLogout()}>
            Logout
          </button>
        </div>
      </Section>
    );
  }
}

export default UserSection;
