import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReplyArea from "../../Reply.js/ReplyArea";

import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../Style/PostDetailCSS";

function PostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  let params = useParams();
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {Flag ? (
        <>
          <Detail PostInfo={PostInfo} />
          <ReplyArea postId={PostInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default PostArea;
