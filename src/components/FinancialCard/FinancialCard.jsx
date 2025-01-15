import React from "react";
import "./FinancialCard.scss";
import { ReactComponent as Arrow } from "../../assets/images/icon/svg/arrow.svg";
import PropTypes from 'prop-types';

const FinancialCard = ({ timeFilter = 'day' }) => {
  // Mock financial data for different time periods
  const financialData = {
    day: {
      totalIncome: 34000,
      totalLossIncome: 5000,
      income: 1000,
      incomeChange: 15,
      expense: 246,
      expenseChange: -10
    },
    week: {
      totalIncome: 238000,
      totalLossIncome: 35000,
      income: 7000,
      incomeChange: 12,
      expense: 1722,
      expenseChange: -8
    },
    month: {
      totalIncome: 1020000,
      totalLossIncome: 150000,
      income: 30000,
      incomeChange: 20,
      expense: 7380,
      expenseChange: -15
    }
  };

  const currentData = financialData[timeFilter] || financialData.day;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="incomeDetail">
      <div className="incomeDetail__item">
        <div className="incomeDetail__title">Total Income</div>
        <div className="incomeDetail__amount">
          {formatCurrency(currentData.totalIncome)}
        </div>
      </div>

      <div className="incomeDetail__item">
        <div className="incomeDetail__title">Total loss Income</div>
        <div className="incomeDetail__amount">
          {formatCurrency(currentData.totalLossIncome)}
        </div>
      </div>

      <div className="incomeDetail__item">
        <div className="incomeDetail__title">Income</div>
        <div className="incomeDetail__amount">
          {formatCurrency(currentData.income)}{" "}
          <div className="incomeDetail__amount-diff greenText">
            <Arrow />
            +{currentData.incomeChange}%
          </div>
        </div>
      </div>

      <div className="incomeDetail__item">
        <div className="incomeDetail__title">Expense</div>
        <div className="incomeDetail__amount">
          {formatCurrency(currentData.expense)}{" "}
          <div className="incomeDetail__amount-diff redText">
            <Arrow />
            {currentData.expenseChange}%
          </div>
        </div>
      </div>
    </div>
  );
};

FinancialCard.propTypes = {
  timeFilter: PropTypes.oneOf(['day', 'week', 'month']).isRequired
};

export default FinancialCard;