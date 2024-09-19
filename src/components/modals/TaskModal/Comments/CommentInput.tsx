import { useRef, useState } from "react";

import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import AutoExpandTextarea from "@/components/inputs/AutoExpandTextarea";
import { Comment } from "@/services/interface";
import { initialUser } from "@/services/initialState";

type Props = {
  onAddComment: (comment: Comment) => void;
};

export default function CommentInput(props: Props) {
  const { onAddComment } = props;

  const [isEdit, setIsEdit] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddComment = () => {
    onAddComment({
      id: new Date().toString(),
      content: textareaRef.current!.value,
      createdBy: initialUser,
      updatedAt: new Date().toString(),
    });
    textareaRef.current!.value = "";
    setIsEdit(false);
  };

  return (
    <div className="flex-grow">
      <AutoExpandTextarea
        textareaRef={textareaRef}
        onFocus={() => setIsEdit(true)}
      />
      {isEdit && (
        <div className="flex gap-2 items-center justify-end">
          <PrimaryButton
            type="button"
            title="Save"
            className="text-sm"
            onClick={handleAddComment}
          />
          <OutlinePrimaryButton
            type="button"
            title="Cancel"
            className="text-sm"
            onClick={() => setIsEdit(false)}
          />
        </div>
      )}
    </div>
  );
}
