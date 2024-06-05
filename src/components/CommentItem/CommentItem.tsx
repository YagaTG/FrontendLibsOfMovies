import { format } from "date-fns";
import { UserAvatar } from "../UserAvatar";

export const CommentItem = (comment) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__user">
          <UserAvatar
            username={comment?.user.username}
            className="comment__avatar"
          ></UserAvatar>
          <a
            href={`/userpage/${comment?.user.id}`}
            className="comment__nickname"
          >
            {comment?.user.username}
          </a>
        </div>
        <div className="comment__date">
          {format(new Date(comment?.createdAt), "H:mm dd-MM-yyyy")}
        </div>
      </div>
      <div className="comment__text">{comment?.text}</div>
    </div>
  );
};
