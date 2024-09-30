import { useNavigate } from "react-router-dom";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PageTitle from "@/layouts/PageTitle";
import UserCard from "@/components/cards/UserCard";
import { useAppSelect } from "@/reduxStore";

export default function Users() {
  const navigate = useNavigate();

  const users = useAppSelect((state) => state.users.data);
  const { isAdmin, isLead } = useAppSelect((state) => state.auth);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Users" />

        {(isAdmin || isLead) && (
          <PrimaryButton
            title="Create"
            onClick={() => navigate("/users/new")}
          />
        )}
      </div>

      {users.length ? (
        <div className="grid grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-lg text-center">No users</div>
      )}
    </div>
  );
}
