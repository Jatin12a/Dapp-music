import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { Verified, ArrowUp, ArrowReshare, Comment } from "../SVG/index";
import MusicAvatar from "../Home/MusicAvatar";
import { convertTime } from "../../utils/utils";

const CommentReply = ({
  comment,
  setActiveReplyId,
  CREATE_COMMENT_REPLY,
  LIKE_REPLY_COMMENT,
  activeUser,
  DISLIKE_REPLY_COMMENT,
  DELETE_COMMENT,
}) => {
  const [replyMsg, setReplyMsg] = useState();

  return (
    <>
      {comment?.replies.length !== 0 && <small>Replies</small>}

      {comment?.replies.map((reply, index) => (
        <div key={reply._id || index}>
          <div className="cursor-pointer rounded-lg md:pr-6">
            <div className="flex flex-row">
              <MusicAvatar image="theblockchaincoders.jpg" />
              <div className="w-full min-w-0">
                <div className="flex flex-00auto items-start gap-2 pb-1.5 md:gap-4">
                  <div className="flex flex-col gap-0.5 md:flex-row md:items-center">
                    <div>
                      <div className="flex items-center gap-1">
                        <div className="font-base text-base-m font-semibold text-base800 md:text-base-l">
                          {reply.user.username}
                        </div>
                        <div className="!hidden md:!block">
                          <div className="c-PJLV c-PJLV-ijAFnOy-css cursor-default hover:cursor-default md:[&_svg]:hover:rounded-full md:[&_svg]:hover:shadow-secondary">
                            <Verified />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center self-start font-base text-base-m font-normal text-base500 md:ml-1 md:text-base-l lg:h-6">
                      <div className="flex flex-row items-center">
                        <span className="px-1 text-[8px] font-normal">•</span>
                        <button className="cursor-default">
                          <span className="hover:text-base600">
                            {convertTime(reply.createdAt)}
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
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="new_comment_margin -my-1 flex h-7 items-center gap-8">
            {reply.likes.length === 0 ? (
              <button
                onClick={() => LIKE_REPLY_COMMENT(comment, reply)}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {reply.likes.length}
                </span>
              </button>
            ) : reply.likes.includes(activeUser._id) ? (
              <button
                onClick={() => DISLIKE_REPLY_COMMENT(comment, reply)}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {reply.likes.length}
                </span>
              </button>
            ) : (
              <button
                onClick={() => LIKE_REPLY_COMMENT(comment, reply)}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {reply.likes.length}
                </span>
              </button>
            )}

            {reply.user._id === activeUser._id && (
              <button
                onClick={() => DELETE_COMMENT(comment, reply)}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <MdOutlineDelete />
                <span className="font-base font-medium text-base900">Only You</span>
              </button>
            )}

            <button
              type="button"
              className="cursor-pointer rounded-md px-2 py-1 hover:bg-neutral100 active:scale-95"
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      ))}

      <textarea
        onChange={(e) => setReplyMsg(e.target.value)}
        className="new_comment_reply"
        rows="3"
      ></textarea>

      <div className="c-lcMBLM c-lcMBLM-fZJslF-withoutPadding-true">
        <div className="flex w-full gap-3">
          <button
            onClick={() => setActiveReplyId("")}
            className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-hxpvys-variant-secondary flex-1"
          >
            Close
          </button>
          <button
            onClick={() => CREATE_COMMENT_REPLY(comment, replyMsg)}
            className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary flex-1"
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentReply;
