import React, { useEffect, useState } from "react";
//postNum에 가지고 있는 정보를 띄워주는 -> useParams
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { PostDiv, BtnDiv, SpinnerDiv, Post } from "../../Style/PostDetailCSS";

function Detail() {
  let params = useParams(); //postNum 추적용
  let navigate = useNavigate();
  const [PostInfo, setPostInfo] = useState({}); // Object type
  const [Flag, setFlag] = useState(false);
  // const user = useSelector((state) => state.user);
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          console.log("응답 데이터", response.data);
          setPostInfo(response.data.post);
          console.log(PostInfo);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Delete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          console.log("응답", response);
          if (response.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/list");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
          console.log(err);
        });
    }
  };

  return (
    <PostDiv>
      {/* {Flag ? ( */}
      <Post>
        {<h1>{PostInfo.title}</h1>}
        <img
          //src={`http://localhost:5002/${PostInfo.image}`} -> 서버에 저장
          src={PostInfo.image}
          alt=""
          style={{ width: "80%", height: "auto" }}
        />
        {/* <h3>{PostInfo.author.displayName}</h3> */}
        {/* {PostInfo.image ? (
              <img
                //src={`http://localhost:5002/${PostInfo.image}`} -> 서버에 저장
                src={PostInfo.image}
                alt=""
                style={{ width: "80%", height: "auto" }}
              />
            ) : null} */}
        <p>{PostInfo.content}</p>
      </Post>
      <BtnDiv>
        <Link to={`/edit/${PostInfo.postNum}`}>
          <button className="edit">수정</button>
        </Link>
        <button className="delete" onClick={() => Delete()}>
          삭제
        </button>
      </BtnDiv>
      {/* {user.uid === PostInfo.author.uid && (
            <BtnDiv>
              <Link to={`/edit/${PostInfo.postNum}`}>
                <button className="edit">수정</button>
              </Link>
              <button className="delete" onClick={() => Delete()}>
                삭제
              </button>
            </BtnDiv>
          )}
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )} */}
    </PostDiv>
  );
}

export default Detail;
