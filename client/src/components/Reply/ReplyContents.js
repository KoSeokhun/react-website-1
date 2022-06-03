import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReplyContentDiv, ReplyUploadDiv } from "../Style/ReplyCSS";
import axios from "axios";
import Avatar from "react-avatar";

function ReplyContents(props) {
  console.log("replycontents 7 전달된 props확인", props.reply);

  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false);
  const [Reply, setReply] = useState(props.reply.reply);
  const ref = useRef();
  const user = useSelector((state) => state.user);
  const Submit = (e) => {
    e.preventDefault();
    if (!Reply) {
      return alert("댓글 내용을 채워주세요!");
    }

    let body = {
      reply: Reply,
      uid: user.userData._id,
      postId: props.reply.postId,
      replyId: props.reply._id,
    };

    axios.post("/api/reply/replyedit", body).then((response) => {
      if (response.data.success) {
        alert("댓글 수정에 성공하였습니다!");
      } else {
        alert("댓글 수정에 실패하였습니다!");
      }
    });
  };

  const Delete = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        replyId: props.reply._id,
        postId: props.reply.postId,
      };
      console.log("42", body);
      axios.post("/api/reply/replydelete", body).then((response) => {
        if (response.data.success) {
          alert("댓글이 삭제되었습니다.");
        } else {
          alert("댓글 삭제에 실패하였습니다.");
        }
      });
    }
  };

  useOnClickOutside(ref, () => setModalFlag(false));
  //console.log("리플컨텐츠 6", props.reply);
  return (
    <ReplyContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avatar
            size="30"
            round={true}
            src={user.userData.image}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>
            {props.reply.author === null
              ? "(탈퇴한 회원)"
              : props.reply.author.Nickname}
          </p>
        </div>

        {props.reply.author._id === user.userData._id ? (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>···</span>
            {ModalFlag ? (
              <div className="modalDiv" ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p className="delete" onClick={(e) => Delete(e)}>
                  삭제
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {EditFlag ? (
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
          <div className="cancel">
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </button>
          </div>
        </ReplyUploadDiv>
      ) : (
        <p>{props.reply.reply}</p>
      )}
    </ReplyContentDiv>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default ReplyContents;
