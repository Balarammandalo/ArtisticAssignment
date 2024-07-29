// Write your code here
import React from 'react'
import './index.css'

const TransactionItem = ({transaction}) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.credit}</td>
      <td>{transaction.debit}</td>
      <td>{transaction.balance}</td>
    </tr>
  )
}

export default TransactionItem
