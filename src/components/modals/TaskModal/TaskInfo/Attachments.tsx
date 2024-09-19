import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Task } from "@/services/interface";

type Props = {
  attachments: Task["attachments"];
  onSetTask: (values: Partial<Task>) => void;
};

export default function Attachment(props: Props) {
  const { attachments, onSetTask } = props;
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    console.log(fileInput.files);

    onSetTask({
      attachments: [
        ...Array.from(fileInput.files).map((file, index) => ({
          id: index.toString(),
          name: file.name,
          url: "",
        })),
      ],
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">Attachment(s)</h4>

        <PrimaryButton
          type="button"
          className="!rounded-full !p-0.5"
          onClick={() => uploadFileRef.current?.click()}
        >
          <FiPlus className="size-5" />
        </PrimaryButton>

        <input
          ref={uploadFileRef}
          type="file"
          className="hidden"
          onChange={handleUploadFile}
          multiple
        />
      </div>

      <div className="mt-3">
        {attachments.map(({ id, name, url }) => (
          <Link
            key={id}
            className="flex items-center justify-between h-[38px] px-4 mb-2 border border-white-light rounded-[6px] bg-[#EBF0FF] text-[#4361EE] text-sm font-light hover:border-primary"
            to={url}
            target="_blank"
          >
            <p>{name}</p>
            <button
              type="button"
              className="border rounded-sm hover:text-danger hover:border-danger/40"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <IoClose size={14} className="shrink-0" />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
