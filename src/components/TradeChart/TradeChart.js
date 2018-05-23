import React, { PureComponent } from 'react';
import { LineChart } from 'react-easy-chart';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from "moment";

import {
  getOffset,
  selectOffset,
  selectCurrentCurrencySellsFrom,
  selectCurrentCurrencyPurchasesFrom,
} from 'ducks/currency';

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
    const { sell, purchase, offset } = this.props;

    return (
      <TradeChartContainer>
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
          <LineChart
            lineColors={['blue', 'red']}
            axes
            grid
            verticalGrid
            interpolate={'cardinal'}
            xType={'time'}
            datePattern={'%d-%m %H:%M'}
            width={750}
            height={400}
            style={{ '.axis path': { stroke: '#EDF0F1' } }}
            data={[
              sell.map(([date, value]) => ({ x: moment(date).format('DD-MM HH:mm'), y: value })),
              purchase.map(([date, value]) => ({
                x: moment(date).format('DD-MM HH:mm'),
                y: value,
              })),
            ]}
          />
        </TradeChartTable>
      </TradeChartContainer>
    );
  }
}

const mapStateToProps = state => ({
  sell: selectCurrentCurrencySellsFrom(state),
  purchase: selectCurrentCurrencyPurchasesFrom(state),
  offset: getOffset(state),
});

const mapDispatchToProps = {
  selectOffset,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeChart);
