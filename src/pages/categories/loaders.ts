import { makeLoader } from "react-router-typesafe";
import { dummyCategories as categories } from "./mock-categories";
import { nanoid } from "nanoid";

export const categoriesLoader = makeLoader(async () => {
  return {
    categories,
  };
});

export const categoryLoader = makeLoader(async ({ params }) => {
  const category = categories.filter(
    (category) => category.id === params.id
  )[0] ?? {
    id: nanoid(),
  };
  return { category };
});
