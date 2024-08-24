import Swal, { SweetAlertOptions } from "sweetalert2";

export default function CenterToast(props: SweetAlertOptions) {
  const toast = Swal.mixin({
    position: "center",
    padding: "10px 20px",
    customClass: {
      popup: "text-black",
    },
    ...props,
  });
  toast.fire();
}
