import React from "react";
import ReplyList from "./ReplyList";
import ReplyUpload from "./ReplyUpload";
import { useSelector } from "react-redux";

function ReplyArea(props) {
  //PostArea로부터 받은 props
  console.log("7", props);

  const state = useSelector((state) => state.state);
  return (
    <>
      <div>
        <ReplyUpload postId={props.postId} />
        {/* 로그인안하면 upload안보여주기 */}
        <ReplyList postId={props.postId} />
      </div>
    </>
  );
}

export default ReplyArea;
