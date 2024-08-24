import {
  forwardRef,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";

import ComponentSpinner from "@/components/loading/ComponentSpinner";

export type ModalRef = {
  open: () => void;
  close: () => void;
  onLoading: (loading: boolean) => void;
};

type Props = {
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  size?: "sm" | "md" | "lg";
  onClosed?: () => void;
};

function Modal(props: PropsWithChildren<Props>, forwardRef: Ref<ModalRef>) {
  const { header, footer, size = "sm", onClosed, children } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(forwardRef, () => ({
    open: () => setIsOpenModal(true),
    close: () => setIsOpenModal(false),
    onLoading: setLoading,
  }));

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTimeout(() => {
      onClosed && onClosed();
    }, 300);
  };

  return (
    <>
      {/* <Dialog
        open={isOpen1}
        onClose={() => setIsOpen1(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>
            This will permanently deactivate your account
          </Description>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <button onClick={() => setIsOpen2(true)}>Open dialog 2</button>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen1(false)}>Cancel</button>
            <button onClick={() => setIsOpen1(false)}>Deactivate</button>
          </div>
        </DialogPanel>
      </Dialog> */}

      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx(
              "relative bg-white p-5 rounded-md w- duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
              {
                "w-[576px]": size === "sm",
                "w-[768px]": size === "md",
                "w-[1024px]": size === "lg",
              }
            )}
          >
            <button
              type="button"
              className="absolute z-10 top-5 right-5 border border-transparent rounded-md text-black hover:opacity-80 hover:border-blue"
              onClick={handleCloseModal}
            >
              <CgClose size={20} />
            </button>

            <ComponentSpinner isLoading={loading}>
              <div>{header}</div>

              <div>{children}</div>

              <div>{footer}</div>
            </ComponentSpinner>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default forwardRef(Modal);
