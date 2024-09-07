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
    <div className="pt-[60px]">
      <div className="relative col-span-1 bg-white shadow rounded-lg group animate-shrink-grow duration-300 hover:shadow-primary/40 hover:shadow-[0px_0px_10px_1px] cursor-pointer">
        <img
          src="/assets/images/sign-up.png"
          alt="avatar"
          className="absolute -top-[60px] right-1/2 translate-x-1/2 w-[120px] h-[120px] object-cover bg-white rounded-full shadow duration-300 group-hover:shadow-primary/40 group-hover:shadow-[0px_-3px_10px_1px]"
        />

        <div className="p-5 pt-[60px]">
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
    </div>
  );
}
