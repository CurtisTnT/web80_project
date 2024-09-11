import { Ref } from "react";
import Modal, { ModalRef } from "@/components/modals/Modal";
import UserCard from "@/components/cards/UserCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";

type Props = {
  userCardModalRef: Ref<ModalRef>;
};

export default function UserCardModal(props: Props) {
  const { userCardModalRef } = props;

  return (
    <Modal
      ref={userCardModalRef}
      header={
        <h2 className="mb-5 text-center text-2xl font-bold">Choose member</h2>
      }
      footer={
        <div className="flex justify-end items-center gap-2 mt-5">
          <p>
            <span className="text-primary">0</span> selected member(s)
          </p>
          <PrimaryButton title="Add" />
        </div>
      }
      size="lg"
    >
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-194px)] overflow-y-scroll p-4 bg-white shadow-[inset_0px_0px_10px_1px] shadow-dark-shadow rounded-md">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </Modal>
  );
}
