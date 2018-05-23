import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectTransactionsHistoryFrom } from 'ducks/transactions';
import styled from "styled-components";
import { getSelectedCurrency } from 'ducks/currency';
import moment from "moment";

const HistoryTable = styled.table`
  margin: 40px 0;
  width: 100%;
  text-align: right;
  border: 1px solid #edf0f1;
  border-collapse: collapse;
  border-radius: 3px;
`;

const TableHeadTr = styled.tr`
  background-color: #edf0f1;
  border: 1px solid #edf0f1;
`;

const TableTh = styled.th`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
  text-align: ${props => (props.left ? 'left' : 'right')};
`;

const TableTd = styled.td`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
  text-align: ${props => (props.left ? 'left' : 'right')};
`;

const TableBodyTr = styled.tr`
  border: 1px solid #edf0f1;
`;

class TransactionsHistory extends Component {
  render() {
    const { selectedCurrency, records } = this.props

    return <article>
        <HistoryTable>
          <thead>
            <TableHeadTr>
              <TableTh>Операция</TableTh>
              <TableTh>Дата</TableTh>
              <TableTh left={true} >{selectedCurrency.toUpperCase()}</TableTh>
              <TableTh left={true} >USD</TableTh>
            </TableHeadTr>
          </thead>
          <tbody>
            {records.map(({ usdDelta, createdAt, ...record }) => (
              <TableBodyTr key={createdAt}>
                <TableTd>{usdDelta > 0 ? 'Продажа' : 'Покупка'}</TableTd>
                <TableTd>{moment(createdAt).format('DD.MM.YYYY HH:mm')}</TableTd>
                <TableTd left={true}>{record[`${selectedCurrency}Delta`]}</TableTd>
                <TableTd left={true}>{usdDelta}</TableTd>
              </TableBodyTr>
            ))}
          </tbody>
        </HistoryTable>
      </article>;
  }
}

const mapStateToProps = state => ({
  records: selectTransactionsHistoryFrom(state),
  selectedCurrency: getSelectedCurrency(state)
})

export default connect(mapStateToProps)(TransactionsHistory);
