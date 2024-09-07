import { useNavigate } from "react-router-dom";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PageTitle from "@/layouts/PageTitle";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Projects" />
        <PrimaryButton
          type="button"
          title="Create"
          className="!w-auto !px-3 !py-1.5"
          onClick={() => navigate("/projects/new")}
        />
      </div>
    </div>
  );
}
