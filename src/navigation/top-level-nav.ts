import { Categories } from "../features/categories/Categories";
import { Edit } from "../features/categories/Edit";
import { List } from "../features/categories/List";
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
        Component: List,
      },
      {
        name: "Edit category",
        path: "/categories/:id",
        Component: Edit,
      },
      {
        name: "New category",
        path: "/categories/new",
        Component: Edit,
      },
    ],
  },
];

export default topLevelNavigation;
