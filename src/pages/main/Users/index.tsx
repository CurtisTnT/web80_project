import { useNavigate } from "react-router-dom";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PageTitle from "@/layouts/PageTitle";
import UserCard from "@/components/cards/UserCard";

export default function Users() {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Users" />

        <PrimaryButton
          title="Create"
          className="!w-auto !px-3 !py-1.5"
          onClick={() => navigate("/users/new")}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
