import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import './index.css'
const transactionTypeOptions = [
  {optionId: 'CREDIT', displayText: 'Credit'},
  {optionId: 'DEBIT', displayText: 'Debit'},
]

class MoneyManager extends Component {
  state = {
    DateValue: '',
    DescriptionValue: '',
    TransactionTypeValue: transactionTypeOptions[0].optionId,
    TotalAmountValue: '',
    TransactionList: [],
  }

  onChangeDate = event => {
    this.setState({DateValue: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({DescriptionValue: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({TransactionTypeValue: event.target.value})
  }

  onChangeTotalAmount = event => {
    this.setState({TotalAmountValue: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {
      TransactionList,
      DateValue,
      DescriptionValue,
      TransactionTypeValue,
      TotalAmountValue,
    } = this.state

    if (
      DateValue &&
      DescriptionValue &&
      TransactionTypeValue &&
      TotalAmountValue
    ) {
      const newTransaction = {
        id: uuidv4(),
        date: DateValue,
        description: DescriptionValue,
        transactionType: TransactionTypeValue,
        totalAmount: parseFloat(TotalAmountValue), // Store as a number
      }

      this.setState({
        TransactionList: [...TransactionList, newTransaction],
        DateValue: '',
        DescriptionValue: '',
        TransactionTypeValue: transactionTypeOptions[0].optionId,
        TotalAmountValue: '',
      })
    }
  }

  onCancel = () => {
    this.setState({
      DateValue: '',
      DescriptionValue: '',
      TransactionTypeValue: transactionTypeOptions[0].optionId,
      TotalAmountValue: '',
    })
  }

  render() {
    const {
      DateValue,
      DescriptionValue,
      TransactionTypeValue,
      TotalAmountValue,
      TransactionList,
    } = this.state

    return (
      <div className="money-manager">
        <div className="TransactionInput">
          <h1 className="title">New Transaction</h1>
          <form className="form" onSubmit={this.onAdd}>
            <div className="input-container">
              <label htmlFor="date" className="dateLabel">
                Date:{' '}
              </label>
              <input
                type="date"
                id="date"
                className="dateInput date"
                value={DateValue}
                onChange={this.onChangeDate}
              />
            </div>
            <div className="input-container">
              <label htmlFor="transactionType" className="dateLabel">
                Transaction Type:{' '}
              </label>
              <select
                id="transactionType"
                className="dateInput type"
                value={TransactionTypeValue}
                onChange={this.onChangeTransactionType}
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label htmlFor="totalAmount" className="dateLabel">
                Total Amount:{' '}
              </label>
              <input
                type="number"
                className="dateInput amount"
                id="totalAmount"
                value={TotalAmountValue}
                onChange={this.onChangeTotalAmount}
              />
            </div>

            <div className="input-container descriptionTextarea">
              <label htmlFor="description" className="dateLabel">
                Description:{' '}
              </label>
              <textarea
                type="text"
                rows="6"
                cols="35"
                className="description"
                id="description"
                value={DescriptionValue}
                onChange={this.onChangeDescription}
              >
                {' '}
              </textarea>
            </div>

            <div className="buttonContainer">
              <button type="submit" className="saveButton">
                Save
              </button>
              <button
                type="button"
                className="cancleButton"
                onClick={this.onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {TransactionList.length === 0 ? (
          <p className="noTransactionPara">No transactions yet!</p>
        ) : (
          <table className="transaction-list">
            <thead>
              <tr>
                <th className="tableHead">Office Transaction</th>
                <th className="tableHead">Description</th>
                <th className="tableHead">Credit</th>
                <th className="tableHead">Debit</th>
                <th className="tableHead">+Add Transaction</th>
              </tr>
            </thead>
            <tbody>
              {TransactionList.map((transaction, index) => {
                const credit =
                  transaction.transactionType === 'CREDIT'
                    ? transaction.totalAmount
                    : 0
                const debit =
                  transaction.transactionType === 'DEBIT'
                    ? transaction.totalAmount
                    : 0

                const balance = TransactionList.slice(0, index + 1).reduce(
                  (acc, trans) => {
                    return trans.transactionType === 'CREDIT'
                      ? acc + trans.totalAmount
                      : acc - trans.totalAmount
                  },
                  0,
                )

                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={{
                      date: transaction.date,
                      description: transaction.description,
                      credit,
                      debit,
                      balance: balance,
                    }}
                  />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default MoneyManager
