import React, { useState, useRef, useEffect } from "react";
import { ReplyContentDiv } from "../Style/ReplyCSS";

function ReplyContents(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));
  //console.log("리플컨텐츠 6", props.reply.author.Nickname);
  return (
    <ReplyContentDiv>
      <div className="author">
        <p>
          {props.reply.author === null
            ? "(탈퇴한 회원)"
            : props.reply.author.Nickname}
        </p>
        <div className="modalControl">
          <span onClick={() => setModalFlag(true)}>···</span>
          {ModalFlag ? (
            <div className="modalDiv" ref={ref}>
              <p
                onClick={() => {
                  //setEditFlag(true);
                  setModalFlag(false);
                }}
              >
                수정
              </p>
              <p className="delete">삭제</p>
            </div>
          ) : null}
        </div>
      </div>
      <p>{props.reply.reply}</p>
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
