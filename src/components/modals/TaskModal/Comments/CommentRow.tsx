import { useEffect, useRef, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { Comment } from "@/services/interface";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import AutoExpandTextarea from "@/components/inputs/AutoExpandTextarea";

type Props = {
  initComment: Comment;
};

export default function CommentRow(props: Props) {
  const { initComment } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState<Comment>(initComment);
  const { id, content, createdBy, updatedAt } = comment;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const timeStamp = formatDistanceToNowStrict(updatedAt).includes("seconds")
    ? "Just now"
    : formatDistanceToNowStrict(updatedAt) + " ago";

  const handleUpdateComment = () => {
    console.log(comment);
    setIsEdit(false);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (isEdit && textarea) {
      const valueLength = textarea.value.length;
      textarea.focus();
      textarea.setSelectionRange(valueLength, valueLength);
    }
  }, [isEdit]);

  useEffect(() => {
    setComment(initComment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initComment.id]);

  return (
    <div key={id} className="flex gap-3">
      <div className="h-[40px] w-[40px] bg-white-light rounded-full border border-white shrink-0">
        <img src={createdBy.avatar} alt="avatar" className="object-contain" />
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex gap-3 items-center">
          <h6 className="font-semibold">
            {createdBy.firstName} {createdBy.lastName}
          </h6>
          <span className="text-sm text-white-dark font-medium">
            {timeStamp}
          </span>
        </div>

        {isEdit ? (
          <>
            <AutoExpandTextarea
              textareaRef={textareaRef}
              value={content}
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
              autoFocus
            />
            <div className="flex gap-2 items-center justify-end">
              <PrimaryButton
                type="button"
                title="Save"
                className="text-sm"
                onClick={handleUpdateComment}
              />
              <OutlinePrimaryButton
                type="button"
                title="Cancel"
                className="text-sm"
                onClick={() => {
                  setComment(initComment);
                  setIsEdit(false);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <p>{content}</p>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="text-sm text-white-dark font-semibold hover:underline hover:text-blue"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm text-white-dark font-semibold hover:underline hover:text-danger"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
