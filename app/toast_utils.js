import { InfoIcon } from "@/components/Icon";
import { toast } from "react-fox-toast";

const options = {
  position: "top-center",
  duration: 5000,
  className: "color border",
};

export function toastError(message) {
  return toast.error(message, options);
}

export function toastSuccess(message) {
  return toast.success(message, options);
}

export function toastInfo(message) {
  return toast.info(
    <div className=" color p-4 bg-white lg max-w-md">
      <h3 className="fond-mono font-semibold text-center text-lg mb-4 ">
        Use following Details to login
      </h3>
      <div className="space-y-4 border-t pt-4">
        <p className="text-gray-700 text-left">
          Email: <strong>test@gmail.com</strong>
        </p>
        <p className="text-gray-700 text-left">
          Password: <strong>password</strong>
        </p>
      </div>
    </div>,
    {
      position: "top-center",
      className: "color border",
      duration: Infinity,
      isCloseBtn: true,
      icon: <InfoIcon />,
    }
  );
}
