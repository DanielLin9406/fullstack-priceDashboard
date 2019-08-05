import React, { Component } from 'react';
import Section, { SectionHeader, SectionBody } from '@app/dump/Section';
import { UserSectionPanel } from '@app/dump/Panel';
import { TextButton } from '@app/dump/Button';
import UserAvatar, { UserName } from '@app/dump/User';

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
