import { useEffect, useState } from "react";

import { initialUser } from "@/services/initialState";
import { Comment, Task } from "@/services/interface";
import CommentRow from "./CommentRow";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import CommentInput from "./CommentInput";

type Props = {
  taskId: Task["id"];
};

export default function Comments(props: Props) {
  const { taskId } = props;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComments([
        {
          id: "1",
          content: "comment 1",
          createdBy: {
            ...initialUser,
            avatar: "/assets/images/sign-up.png",
            firstName: "User",
            lastName: "1",
            id: "1",
          },
          updatedAt: "2024/09/16",
        },
        {
          id: "2",
          content: "comment 2",
          createdBy: {
            ...initialUser,
            avatar: "/assets/images/sign-up.png",
            firstName: "User",
            lastName: "2",
            id: "2",
          },
          updatedAt: "2024/09/18 21:00",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [taskId]);

  console.log(comments);

  return (
    <div className="col-span-1 h-[calc(100vh-208px)] overflow-y-scroll p-5 bg-white rounded-lg shadow-[0px_0px_5px_0px] shadow-dark-shadow">
      <h3 className="text-xl font-semibold">Comment</h3>

      <div className="flex gap-3 border-b py-3">
        <div className="h-[40px] w-[40px] bg-white-light rounded-full border border-white shrink-0">
          <img
            src="/assets/images/sign-up.png"
            alt="avatar"
            className="object-contain"
          />
        </div>

        <CommentInput
          onAddComment={(newComment) => setComments([newComment, ...comments])}
        />
      </div>

      <ComponentSpinner
        isLoading={loading}
        className="mt-3 min-h-5 space-y-3"
        loaderClassName="!w-6 !h-6 !border-[2.5px]"
      >
        {comments.map((comment) => (
          <CommentRow initComment={comment} />
        ))}
      </ComponentSpinner>
    </div>
  );
}
