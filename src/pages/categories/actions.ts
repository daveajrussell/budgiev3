import { makeAction, redirect } from "react-router-typesafe";
import { nanoid } from "nanoid";
import { dummyCategories } from "./mock-categories";

export const categoryAction = makeAction(async ({ params, request }) => {
  const { id } = params;

  const category = dummyCategories.filter(
    (category) => category.id === id
  )[0] ?? {
    id: nanoid(),
  };

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  category.name = updates["name"].toString();
  category.type = updates["type"].toString();

  if (!id) {
    dummyCategories.push(category);
  }

  return redirect("/categories");
});

export const deleteCategoryAction = makeAction(async ({ params }) => {
  const { id } = params;
  const idx = dummyCategories.findIndex((category) => category.id === id);
  if (idx > -1) dummyCategories.splice(idx, 1);
  return redirect("/categories");
});
