import { TooltipItem } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PieChart } from '../../components/PieChart';
import { Tile } from '../../components/Tile';
import { fetchAccounts, selectAllAccounts } from '../accounts/accountSlice';
import hexRgb from 'hex-rgb';
import { AccountType } from 'budgie-core';
import { useEffect } from 'react';

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector((rootState) => selectAllAccounts(rootState));

  const accountsStatus = useAppSelector((state) => state.account.status);

  useEffect(() => {
    if (accountsStatus === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [accountsStatus, dispatch]);

  const incomes = accounts.filter((c) => c.type === AccountType.Income),
    incomesTotal = incomes
      .map((c) => c.amount)
      .reduce((total, amount) => total + amount, 0),
    expenses = accounts.filter((c) => c.type === AccountType.Expense),
    expensesTotal = expenses
      .map((c) => c.amount)
      .reduce((total, amount) => total + amount, 0),
    labels = expenses.map((c) => c.name.toString()),
    data = expenses.map((c) => c.amount),
    totalUnallocated = incomesTotal - expensesTotal,
    backgroundColors = expenses.map((c) =>
      hexRgb(c.color, { format: 'css', alpha: 0.5 }),
    ),
    borderColors = expenses.map((c) =>
      hexRgb(c.color, { format: 'css', alpha: 1 }),
    );

  labels.push(totalUnallocated < 0 ? 'Overbudget' : 'Unallocated');
  data.push(totalUnallocated);
  backgroundColors.push(hexRgb('#9B9B9B', { format: 'css', alpha: 0.5 }));
  borderColors.push(hexRgb('#9B9B9B', { format: 'css', alpha: 1 }));

  function formatLabel(context: TooltipItem<'pie'>) {
    const percentage = Math.round((context.parsed / incomesTotal) * 100);
    return `£${context.parsed} (${percentage}%)`;
  }

  return (
    <>
      <h1 className="py-2">Dashboard</h1>

      <div className="py-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <Tile title="Breakdown">
            <PieChart
              labels={labels}
              datasets={{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
              }}
              legendPosition="right"
              labelFormatter={formatLabel}
            />
          </Tile>
          <Tile title="Spending">
            <PieChart
              labels={[]}
              datasets={{
                data: [],
                backgroundColor: backgroundColors,
                borderColor: borderColors,
              }}
              legendPosition="right"
              labelFormatter={formatLabel}
            />
          </Tile>
        </div>
      </div>
    </>
  );
};
