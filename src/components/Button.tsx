import classNames from "../helpers/class-names";

type ButtonProps = {
  text: string;
  type: "button" | "submit";
  thing: "primary" | "secondary" | "delete";
  onClick?: Function;
};

export const Button = ({ text, type, thing, onClick }: ButtonProps) => {
  function classForThing(): string {
    switch (thing) {
      case "secondary":
        return "bg-white text-black focus-visible:outline-black";
      case "delete":
        return "bg-red-500 text-white hover:bg-red-400 focus-visible:outline-red-600";
      default:
        return "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600";
    }
  }

  return (
    <button
      type={type}
      className={classNames(
        "rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        classForThing()
      )}
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
};
