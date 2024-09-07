import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbHierarchy } from "react-icons/tb";

export default function UserCard() {
  const renderRow = (icon: React.ReactNode, value: string | number) => (
    <div className="flex items-center gap-2">
      {icon}
      <p className="font-medium">{value}</p>
    </div>
  );

  return (
    <div className="relative pt-[60px]">
      <img
        src="/assets/images/sign-up.png"
        alt="avatar"
        className="absolute top-0 right-1/2 translate-x-1/2 w-[120px] h-[120px] object-cover rounded-full shadow bg-white"
      />

      <div className="col-span-1 p-5 pt-[60px] bg-white rounded-lg shadow">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold">Curtis Truong</h3>
          <h4 className="text-sm">Full-stack developer</h4>
        </div>

        <div className="mt-3 space-y-2 text-sm">
          {renderRow(
            <IoMailOutline size={20} className="text-blue" />,
            "nghiatintruong@gmail.com"
          )}

          {renderRow(
            <HiMiniDevicePhoneMobile size={20} className="text-blue" />,
            "0987654321"
          )}

          {renderRow(
            <TbHierarchy size={20} className="text-blue" />,
            "Entry level"
          )}
        </div>
      </div>
    </div>
  );
}
