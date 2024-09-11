import { Fragment } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type Props = {
  items: { title: string; href?: string }[];
};

export default function Breadcrumb(props: Props) {
  const { items } = props;
  return (
    <div className="flex items-center gap-2 text-lg text-white-dark font-medium">
      {items.map(({ title, href }, index) => (
        <Fragment key={index}>
          <p
            className={clsx("", {
              hidden: !index,
            })}
          >
            /
          </p>
          {href ? <Link to={href}>{title}</Link> : <span>{title}</span>}
        </Fragment>
      ))}
    </div>
  );
}
