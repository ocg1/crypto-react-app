import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from 'react-svg-spinner';

import { selectOffset, selectIsLoading, getOffset } from 'ducks/currency';
import LineChart from './LineChart';
import OffsetButton from '../OffsetButton';

const OFFSETS = { '2h': '2ч', '4h': '4ч', '8h': '8ч', '1d': '1д', '7d': '7д' };

const TradeChartContainer = styled.article`
  width: 750px;

  h2 {
    margin-bottom: 10px;
  }
`;

const TradeChartTable = styled.div`
  border: 1px solid #edf0f1;
  height: 448px;
  margin-top: 15px;
  border-radius: 3px;
`;

const TradeChartOffsets = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #edf0f1;
  padding-top: 10px;
  padding-bottom: 10px;
`;

class TradeChart extends PureComponent {
  handleOffsetClick = key => {
    this.props.selectOffset(key);
  };

  render() {
    const { isLoading, offset } = this.props;
    return (
      <TradeChartContainer>
        <h2>Окно графика</h2>
        <TradeChartTable>
          <TradeChartOffsets>
            {Object.keys(OFFSETS).map(key => (
              <OffsetButton
                key={key}
                {...{ offsetKey: key, selectedOffset: offset, handleClick: this.handleOffsetClick }}
              >
                {OFFSETS[key]}
              </OffsetButton>
            ))}
          </TradeChartOffsets>

          {isLoading ? <Spinner size="16px" color="#adadad" gap={5} /> : <LineChart />}
        </TradeChartTable>
      </TradeChartContainer>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  offset: getOffset(state),
});

const mapDispatchToProps = {
  selectOffset,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeChart);
