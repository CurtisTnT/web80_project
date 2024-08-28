import { Link } from "react-router-dom";
import { SlUser } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";

import AppLogo from "@/layouts/AppLogo";
import DropdownBtn, { DropdownItem } from "@/components/dropdowns/DropdownBtn";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-20 flex items-center justify-between h-20 bg-white shadow-[0px_5px_10px_1px] shadow-dark-shadow px-5">
      <Link to="/">
        <AppLogo />
      </Link>

      <div className="flex items-center gap-2">
        <div className="text-end">
          <p className="font-semibold">Curtis Truong</p>
          <p className="text-sm text-white-dark">nghiatintruong@gmail.com</p>
        </div>

        <DropdownBtn
          button={
            <img
              src="/assets/images/sign-up.png"
              alt="avatar"
              className="w-[50px] h-[50px] rounded-full border shadow-md object-cover"
            />
          }
        >
          <DropdownItem onClick={() => {}} className="font-medium">
            <SlUser size={20} />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem
            onClick={() => {}}
            className="font-medium text-danger hover:!text-white hover:!bg-danger"
          >
            <IoLogOutOutline size={20} />
            <span>Logout</span>
          </DropdownItem>
        </DropdownBtn>
      </div>
    </header>
  );
}
