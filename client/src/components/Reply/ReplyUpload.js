import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Auth from "../../hoc/auth";
import { ReplyUploadDiv } from "../Style/ReplyCSS";
import { useNavigate } from "react-router-dom";

function ReplyUpload(props) {
  //ReplyArea로부터 받은 props
  const [Reply, setReply] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const Submit = (e) => {
    e.preventDefault();
    if (!Reply) {
      return alert("댓글 내용을 채워주세요!");
    }

    let body = {
      reply: Reply,
      uid: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/reply/submit", body).then((response) => {
      //setReply("");
      if (response.data.success) {
        alert("댓글 작성에 성공하였습니다!");

        //댓글리스트가 컴포넌트 마운트시에 한번만 불러와지기 때문에 여기서 댓글 등록할때마다 새로고침 시켜주기
        //새로고침시 id를 못불러오는 오류가 있어서 주석처리함
        // window.location.reload();
        //Detail.js:48 Uncaught TypeError: Cannot read properties of undefined (reading '_id') at Detail (Detail.js:48:1)
      } else {
        alert("댓글 작성에 실패하였습니다!");
      }
      return navigate(`/post/${props.postNum}`);
    });
  };
  return (
    <ReplyUploadDiv>
      <form>
        <input
          type="text"
          value={Reply}
          onChange={(e) => {
            setReply(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            Submit(e); //
          }}
        >
          등록
        </button>
      </form>
    </ReplyUploadDiv>
  );
}

export default ReplyUpload;
//export default Auth(ReplyUpload, true);
