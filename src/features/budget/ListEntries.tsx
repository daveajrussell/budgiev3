import { NavLink } from "react-router-dom";
import { Button } from "../../components/Button";

export const ListEntries = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Budget entries</h1>
        <NavLink to="entry/new">
          <Button text="Add new" type="button" color="secondary" />
        </NavLink>
      </div>
    </>
  );
};
