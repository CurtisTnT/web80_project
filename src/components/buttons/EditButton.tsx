import clsx from "clsx";
import { FiEdit } from "react-icons/fi";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function EditButton(props: Props) {
  const { onClick, className } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("hover:opacity-70", className)}
    >
      <FiEdit className="shrink-0 text-blue" size={20} />
    </button>
  );
}
