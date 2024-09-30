import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbHierarchy } from "react-icons/tb";

import { User } from "@/reduxStore/interface";
import { JobTitle } from "@/constants/jobTitle";
import { displayEnumValue } from "@/utils/helpers";
import { DesignationLevel } from "@/constants/designationLevel";

type Props = {
  user: User;
};

export default function UserCard(props: Props) {
  const { user } = props;
  const {
    id,
    avatar,
    firstName,
    lastName,
    email,
    phoneNumber,
    designationLevel,
    jobTitle,
  } = user;

  const navigate = useNavigate();

  const renderRow = (icon: React.ReactNode, value: string | number) => (
    <div className="flex items-center gap-2">
      {icon}
      <p className="font-medium">{value}</p>
    </div>
  );

  return (
    <div className="pt-[60px]">
      <div
        className="relative col-span-1 bg-white shadow rounded-lg group duration-300 hover:scale-95 hover:shadow-primary/40 hover:shadow-[0px_0px_10px_1px] cursor-pointer"
        onClick={() => navigate("/users/" + id)}
      >
        <div className="absolute -top-[60px] right-1/2 flex justify-center items-center translate-x-1/2 w-[120px] h-[120px] object-cover bg-white rounded-full shadow-md duration-300 group-hover:shadow-primary/40 group-hover:shadow-[0px_-3px_10px_1px]">
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <div className="text-5xl text-blue font-medium uppercase">
              {firstName.slice(0, 1)}
              {lastName.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="p-5 pt-[60px]">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold">
              {firstName} {lastName}
            </h3>
            <h4 className="text-sm">{displayEnumValue(jobTitle, JobTitle)}</h4>
          </div>

          <div className="mt-3 space-y-2 text-sm">
            {renderRow(
              <IoMailOutline size={20} className="text-blue" />,
              email
            )}

            {renderRow(
              <HiMiniDevicePhoneMobile size={20} className="text-blue" />,
              phoneNumber
            )}

            {renderRow(
              <TbHierarchy size={20} className="text-blue" />,
              displayEnumValue(designationLevel, DesignationLevel)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
