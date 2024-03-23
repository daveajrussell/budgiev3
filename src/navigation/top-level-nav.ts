import { Budget } from "../features/budget/Budget";
import { Categories } from "../features/categories/Categories";
import { Edit as EditCategory } from "../features/categories/Edit";
import { List as ListCategories } from "../features/categories/List";
import { ListEntries } from "../features/budget/ListEntries";
import { EditEntry } from "../features/budget/EditEntry";
import { Dashboard } from "../features/dashboard/Dashboard";

const topLevelNavigation = [
  {
    name: "Dashboard",
    path: "/",
    Component: Dashboard,
  },
  {
    name: "Categories",
    path: "/categories",
    Component: Categories,
    children: [
      {
        name: "Categories",
        path: "/categories",
        Component: ListCategories,
      },
      {
        name: "Edit category",
        path: "/categories/:id",
        Component: EditCategory,
      },
      {
        name: "New category",
        path: "/categories/new",
        Component: EditCategory,
      },
    ],
  },
  {
    name: "Budget",
    path: "/budget",
    Component: Budget,
    children: [
      {
        name: "Budget",
        path: "/budget",
        Component: ListEntries,
      },
      {
        name: "Edit budget",
        path: "/budget/entry/:id",
        Component: EditEntry,
      },
      {
        name: "New budget",
        path: "/budget/entry/new",
        Component: EditEntry,
      },
    ],
  },
];

export default topLevelNavigation;
