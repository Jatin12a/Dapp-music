import React from "react";
import { Verified, ArrowReshare, Comment, CircleArrowUp, ArrowUp } from "../SVG/index";
import MusicAvatar from "../Home/MusicAvatar";
import { convertTime } from "../../utils/utils";
import CommentReply from "./CommentReply";

const CommentView = ({
  postComments,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  activeUser,
  CREATE_COMMENT_REPLY,
  setActiveReplyId,
  activeReplyId,
  LIKE_REPLY_COMMENT,
  DISLIKE_REPLY_COMMENT,
  DELETE_COMMENT,
}) => {
  return (
    <>
      {postComments?.slice(0, 2).map((comment) => {
        const userLiked = comment.likes.includes(activeUser._id);
        return (
          <React.Fragment key={comment._id}>
            <div className="cursor-pointer rounded-lg md:pr-6">
              <div className="flex flex-row">
                <MusicAvatar image="theblockchaincoders.jpg" />
                <div className="w-full min-w-0">
                  <div className="flex items-start gap-2 pb-1.5 md:gap-4">
                    <div className="flex flex-col gap-0.5 md:flex-row md:items-center">
                      <div className="flex items-center gap-1">
                        <div className="font-base text-base-m font-semibold text-base800 md:text-base-l">
                          {comment.user.username}
                        </div>
                        {comment.user.verify && (
                          <div className="hidden md:block cursor-default">
                            <Verified />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center self-start font-base text-base-m font-normal text-base500 md:ml-1 md:text-base-l lg:h-6">
                        <div className="flex flex-row items-center">
                          <span className="px-1 text-[8px] font-normal">•</span>
                          <button className="cursor-default">
                            <span className="hover:text-base600">
                              {convertTime(comment.createdAt)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="overflow-hidden whitespace-pre-wrap break-words transition-[max-height] duration-200 ease-in-out max-h-[140px] md:max-h-[152px]">
                        <div className="whitespace-pre-wrap font-base text-base-m md:text-base-l">
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="new_comment_margin -my-1 flex h-7 items-center gap-8">
              <button
                onClick={() => setActiveReplyId(comment._id)}
                className="cursor-pointer rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Comment />
                  <span className="font-base font-medium text-base900">
                    {comment.replies.length || 0}
                  </span>
                </div>
              </button>

              <button
                onClick={() => (userLiked ? DISLIKE_COMMENT(comment) : LIKE_COMMENT(comment))}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {comment.likes.length}
                </span>
              </button>

              <button className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95">
                <CircleArrowUp />
                <span className="font-base font-medium text-base900">6</span>
              </button>

              <button
                type="button"
                className="cursor-pointer rounded-md px-2 py-1 hover:bg-neutral100 active:scale-95"
              >
                <ArrowUp />
              </button>
            </div>

            {activeReplyId === comment._id && (
              <CommentReply
                comment={comment}
                setActiveReplyId={setActiveReplyId}
                CREATE_COMMENT_REPLY={CREATE_COMMENT_REPLY}
                LIKE_REPLY_COMMENT={LIKE_REPLY_COMMENT}
                activeUser={activeUser}
                DISLIKE_REPLY_COMMENT={DISLIKE_REPLY_COMMENT}
                DELETE_COMMENT={DELETE_COMMENT}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CommentView;
