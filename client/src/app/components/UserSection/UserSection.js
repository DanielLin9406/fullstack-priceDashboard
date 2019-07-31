import React, { Component } from 'react';
import Section, { SectionHeader, SectionBody } from '@app/dump/Section';
import { UserSectionPanel } from '@app/dump/Panel';
import { TextButton } from '@app/dump/Button';
import UserAvatar, { UserName } from '@app/dump/User';

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

export default class UserSection extends Component {
  render() {
    return (
      <Section className="user-section">
        <SectionHeader>User Section</SectionHeader>
        <SectionBody isLoading={false} errMsg={[]}>
          <UserSectionPanel>
            <UserAvatar>{this.props.user.name.charAt(0)}</UserAvatar>
            <UserName>{this.props.user.name}</UserName>
            <TextButton onClick={this.props.handleLogout()}>Logout</TextButton>
          </UserSectionPanel>
        </SectionBody>
      </Section>
    );
  }
}
