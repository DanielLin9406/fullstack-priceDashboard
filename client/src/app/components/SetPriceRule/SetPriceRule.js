import React from 'react';
import Section, {
  SectionWrap,
  SectionBody,
  SectionHeader
} from '@app/dump/Section';
import Panel from '@app/dump/Panel';
import { RowFloatGroup } from '@app/dump/RowCol';
import { testFetchLoading } from '@app/shared/testFetch';
import HandlePromotion from '@app/dump/HandlePromotion';
import AddPromotion from '@app/components/AddPromotion/Container';
import EditPromotion from '@app/components/EditPromotion/Container';

import './SetPriceRule.scss';

const SetPriceRule = props => {
  const { loading, errMsg, active, hideEditPromotion } = props;
  const isLoading = testFetchLoading(loading);
  // const toggleAddNewPromotion = () => {
  //   hideEditPromotion();
  // };

  return (
    <Section className="set-price-rule">
      {active && (
        <SectionWrap>
          <SectionHeader>Edit Existing Promotion</SectionHeader>
          <SectionBody isLoading={isLoading} errMsg={errMsg}>
            <Panel>
              <EditPromotion>
                {(state, { handleAsyncPromoCall }) => (
                  <HandlePromotion
                    {...state}
                    handleAsyncPromoCall={handleAsyncPromoCall}
                  />
                )}
              </EditPromotion>
            </Panel>
          </SectionBody>
        </SectionWrap>
      )}
      <SectionWrap>
        <SectionHeader>Set New Promotion</SectionHeader>
        <SectionBody isLoading={isLoading} errMsg={errMsg}>
          <Panel>
            <AddPromotion>
              {(state, { handleAsyncPromoCall }) => (
                <HandlePromotion
                  {...state}
                  handleAsyncPromoCall={handleAsyncPromoCall}
                />
              )}
            </AddPromotion>
          </Panel>
        </SectionBody>
      </SectionWrap>
    </Section>
  );
};

export default SetPriceRule;

// {/* {isHideEditPromo && (
//   <RowFloatGroup>
//     <GreenButton onClick={event => toggleAddNewPromotion(event)}>
//       Add New Promotion
//     </GreenButton>
//   </RowFloatGroup>
// )} */}
