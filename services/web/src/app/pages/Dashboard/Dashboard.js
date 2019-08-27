import React, { Component } from 'react';
import HelmetLayout from '@app/layout/helmet/HelmetLayout';
import Calendar from '@app/components/Calendar/Container';
import CurrentPrice from '@app/components/CurrentPrice/Container';
import QueuePromo from '@app/components/QueuePromo/Container';
import CurrentPromotion from '@app/components/CurrentPromotion/Container';
import SetPriceRule from '@app/components/SetPriceRule/Container';
import UserSection from '@app/components/UserSection/Container';

class Dashboard extends Component {
  componentDidMount() {
    this.loadPromotionData();
    this.loadPrice();
  }

  loadPromotionData = () => {
    this.props.asyncGetPromotion({ user: this.props.user });
  };

  loadPrice = () => {
    this.props.asyncGetPrice({ user: this.props.user });
  };

  render() {
    return (
      <HelmetLayout
        id="dashboard"
        title="Dashboard"
        description="Main dashboard"
      >
        <CurrentPromotion />
        <UserSection />
        <Calendar />
        <SetPriceRule />
        <QueuePromo />
        <CurrentPrice />
      </HelmetLayout>
    );
  }
}

export default Dashboard;
