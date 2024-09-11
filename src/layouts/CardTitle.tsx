import clsx from "clsx";

type Props = {
  title: string;
  className?: string;
};

export default function CardTitle(props: Props) {
  const { title, className } = props;

  return <h1 className={clsx("text-lg font-semibold", className)}>{title}</h1>;
}
