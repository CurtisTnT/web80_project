import { PropsWithChildren } from "react";
import clsx from "clsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const DropdownItem = ({
  children,
  onClick,
  className,
}: PropsWithChildren<{ onClick: () => void; className?: string }>) => {
  return (
    <MenuItem>
      <div className="py-0.5">
        <button
          className={clsx(
            "flex w-full items-center gap-3 rounded-lg py-1.5 px-3 hover:bg-blue hover:text-white",
            className
          )}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </MenuItem>
  );
};

type Props = {
  button: React.ReactNode;
  className?: string;
};

export default function DropdownBtn(props: PropsWithChildren<Props>) {
  const { button, className, children } = props;

  return (
    <div className={className}>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 data-[hover]:opacity-70 data-[open]:opacity-70">
          {button}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 z-20 rounded-xl border shadow-md bg-white p-1 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 divide-y"
        >
          {children}
        </MenuItems>
      </Menu>
    </div>
  );
}
