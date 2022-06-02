import React, { useEffect, useState } from "react";
import axios from "axios";

function ReplyList(props) {
  //props 들어옴
  const [ReplyList, setReplyList] = useState([]);
  let body = {
    postId: props.postId,
  };
  useEffect(() => {
    axios.post("/api/reply/replylist", body).then((response) => {
      if (response.data.success) {
        console.log(response.data); //응답 데이터에서 ReplyList 확인이 안됨
        setReplyList([...response.data.ReplyList]);
      }
    });
  }, []);
  return (
    <>
      <div>
        {ReplyList.map((reply, idx) => {
          return <div key={idx}>{reply.reply}</div>;
        })}
      </div>
    </>
  );
}

export default ReplyList;
