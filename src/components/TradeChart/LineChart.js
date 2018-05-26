import React from "react";
import { LineChart } from 'react-easy-chart';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectCurrentCurrencySellsFrom,
  selectCurrentCurrencyPurchasesFrom,
} from 'ducks/currency';

const lineChart = ({sell, purchase}) => (
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
);

lineChart.propTypes = {
  sell: PropTypes.array.isRequired,
  purchase: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  sell: selectCurrentCurrencySellsFrom(state),
  purchase: selectCurrentCurrencyPurchasesFrom(state),
});

export default connect(mapStateToProps)(lineChart)
