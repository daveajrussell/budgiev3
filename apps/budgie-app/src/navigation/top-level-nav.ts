import { Entries } from '../features/entries/Entries';
import { Accounts } from '../features/accounts/Accounts';
import { Edit as EditAccount } from '../features/accounts/Edit';
import { List as ListAccounts } from '../features/accounts/List';
import { List as ListEntries } from '../features/entries/List';
import { Edit as EditEntry } from '../features/entries/Edit';
import { Dashboard } from '../features/dashboard/Dashboard';

const topLevelNavigation = [
  {
    name: 'Dashboard',
    path: '/',
    Component: Dashboard,
  },
  {
    name: 'Accounts',
    path: '/accounts',
    Component: Accounts,
    children: [
      {
        name: 'Accounts',
        path: '/accounts',
        Component: ListAccounts,
      },
      {
        name: 'Edit account',
        path: '/accounts/:id',
        Component: EditAccount,
      },
      {
        name: 'New account',
        path: '/accounts/new',
        Component: EditAccount,
      },
    ],
  },
  {
    name: 'Entries',
    path: '/entries',
    Component: Entries,
    children: [
      {
        name: 'Entries',
        path: '/entries',
        Component: ListEntries,
      },
      {
        name: 'Edit entry',
        path: '/entries/:id',
        Component: EditEntry,
      },
      {
        name: 'New entry',
        path: '/entries/new',
        Component: EditEntry,
      },
    ],
  },
];

export default topLevelNavigation;
