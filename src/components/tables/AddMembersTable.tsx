import { useRef } from "react";
import clsx from "clsx";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import FieldLabel from "@/components/inputs/FieldLabel";
import UsersTable from "./UsersTable";
import { ModalRef } from "@/components/modals/Modal";
import PlusIcon from "@/icons/PlusIcon";
import UserCardModal from "@/pages/main/Projects/NewProject/UserCardModal";

type Props = {
  isEdit?: boolean;
};

export default function AddMembersTable(props: Props) {
  const { isEdit = false } = props;

  const userCardModalRef = useRef<ModalRef>(null);

  return (
    <div>
      <FieldLabel
        name="members"
        label="Members"
        labelStyle={clsx({
          "text-white-dark": !isEdit,
        })}
      />

      <UsersTable />

      <div className="flex justify-center items-center mt-2">
        {isEdit && (
          <PrimaryButton
            type="button"
            onClick={() => userCardModalRef.current?.open()}
          >
            <PlusIcon />
            <span className="text-sm">Add member(s)</span>
          </PrimaryButton>
        )}
      </div>

      <UserCardModal userCardModalRef={userCardModalRef} />
    </div>
  );
}
