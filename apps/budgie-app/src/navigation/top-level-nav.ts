import { Entries } from '../features/entries/Entries';
import { Categories } from '../features/categories/Categories';
import { Edit as EditCategory } from '../features/categories/Edit';
import { List as ListCategories } from '../features/categories/List';
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
    name: 'Categories',
    path: '/categories',
    Component: Categories,
    children: [
      {
        name: 'Categories',
        path: '/categories',
        Component: ListCategories,
      },
      {
        name: 'Edit category',
        path: '/categories/:id',
        Component: EditCategory,
      },
      {
        name: 'New category',
        path: '/categories/new',
        Component: EditCategory,
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
