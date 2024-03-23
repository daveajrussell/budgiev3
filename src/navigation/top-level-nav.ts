import { Categories } from "../pages/categories/Categories";
import { categoryLoader, categoriesLoader } from "../pages/categories/loaders";
import { Edit } from "../pages/categories/Edit";
import { List } from "../pages/categories/List";
import { Dashboard } from "../pages/Dashboard";
import {
  categoryAction,
  deleteCategoryAction,
} from "../pages/categories/actions";

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
        loader: categoriesLoader,
        Component: List,
      },
      {
        name: "Edit category",
        path: "/categories/:id",
        loader: categoryLoader,
        action: categoryAction,
        Component: Edit,
      },
      {
        name: "New category",
        path: "/categories/new",
        loader: categoryLoader,
        action: categoryAction,
        Component: Edit,
      },
      {
        path: "/categories/:id/destroy",
        action: deleteCategoryAction,
      },
    ],
  },
];

export default topLevelNavigation;
