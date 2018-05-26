import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from 'react-svg-spinner';

import {
  selectOffset,
  selectIsLoading,
  getOffset,
} from 'ducks/currency';
import LineChart from "./LineChart";

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

const ButtonOffset = styled.button`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#6AB4DD' : 'transparent')};
  color: ${props => (props.selected ? 'white' : '#9998a1')};
  padding: 2px 16px;
`;

class TradeChart extends PureComponent {
  handleOffsetClick = key => {
    this.props.selectOffset(key);
  };

  render() {
    const { isLoading, offset } = this.props;
    return <TradeChartContainer>
        <h2>Окно графика</h2>
        <TradeChartTable>
          <TradeChartOffsets>
            {Object.keys(OFFSETS).map(key => (
              <ButtonOffset
                key={key}
                selected={offset === key}
                onClick={this.handleOffsetClick.bind(this, key)}
              >
                {OFFSETS[key]}
              </ButtonOffset>
            ))}
          </TradeChartOffsets>

          {isLoading ? <Spinner size="16px" color="#adadad" gap={5} /> : <LineChart />}
        </TradeChartTable>
      </TradeChartContainer>;
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  offset: getOffset(state)
});

const mapDispatchToProps = {
  selectOffset,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeChart);
