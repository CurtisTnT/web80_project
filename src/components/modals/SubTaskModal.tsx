import { Ref } from "react";
import Modal, { ModalRef } from "./Modal";

type Props = {
  subTaskModalRef: Ref<ModalRef>;
};

export default function SubTaskModal(props: Props) {
  const { subTaskModalRef } = props;

  return <Modal ref={subTaskModalRef} size="full"></Modal>;
}
