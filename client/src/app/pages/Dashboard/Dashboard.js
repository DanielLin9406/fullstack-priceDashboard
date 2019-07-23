import React, { Component } from 'react';
import HelmetLayout from '@app/layout/helmet/HelmetLayout';
import Calendar from '@app/components/Calendar/Container';
import CurrentPriceRule from '@app/components/CurrentPriceRule/Container';
import QueuePromo from '@app/components/QueuePromo/Container';
import CurrentPromotion from '@app/components/CurrentPromotion/Container';
import SetPriceRule from '@app/components/SetPriceRule/Container';
import UserSection from '@app/components/UserSection/Container';

class Dashboard extends Component {
  componentDidMount() {
    this.loadPromotionData();
    this.loadBCPrice();
    this.loadPGLicense();
  }

  loadPromotionData = () => {
    this.props.asyncGetPromotion({ user: this.props.user });
  };

  loadBCPrice = () => {
    this.props.asyncGetBCPrice({ user: this.props.user });
  };

  loadPGLicense = () => {
    this.props.asyncGetLicenseRule({ user: this.props.user });
  };

  render() {
    return (
      <HelmetLayout
        id="dashboard"
        title="Dashboard"
        description="Main dashboard"
      >
        {this.props.children}
      </HelmetLayout>
    );
  }
}

const WrappedDashboard = ({ ...props }) => {
  return (
    <Dashboard {...props}>
      <CurrentPromotion />
      <UserSection />
      <Calendar />
      <SetPriceRule />
      <QueuePromo />
      <CurrentPriceRule />
    </Dashboard>
  );
};

export default WrappedDashboard;
