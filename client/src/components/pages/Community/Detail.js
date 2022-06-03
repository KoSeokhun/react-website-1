import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { PostDiv, BtnDiv, Post } from "../../Style/PostDetailCSS";
import Auth from "../../../hoc/auth";

function Detail(props) {
  let params = useParams(); //postNum 추적용: postNum에 가지고 있는 정보를 띄워주는 -> useParams
  let navigate = useNavigate();
  const user = useSelector((state) => state.user); //값이 로딩안된이유:순서다~!~!
  console.log("detail.js 13", user);
  //게시글 시간 설정
  const SetTime = (a, b) => {
    if (a !== b) {
      //수정한 시간 (updatedAt)
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + " (수정됨)";
    } else {
      //게시글을 쓴 시간 (createdAt)
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };

  //삭제버튼 함수
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
            navigate("/community");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
          console.log(err);
        });
    }
  };
  //console.log("detail.js 46", props.PostInfo);
  console.log("detail.js 48", user.userData);
  return (
    <PostDiv>
      <Post>
        <h1>{props.PostInfo.title}</h1>
        <div className="author">
          <h3>{props.PostInfo.author.Nickname}</h3>
          {/* 아바타 컴포넌트 들어갈 자리 */}
          <p className="time">
            {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
            {/* moment.js 라는 라이브러리 사용: 시간 라이브러리 */}
          </p>
        </div>
        {/* 이미지 있으면 보여주고 없으면 패스 */}
        {props.PostInfo.image ? (
          <img
            //src={`http://localhost:5002/${props.PostInfo.image}`} -> 서버에 저장용
            src={props.PostInfo.image}
            alt=""
            style={{ width: "80%", height: "auto" }}
          />
        ) : null}
        <p>{props.PostInfo.content}</p>
      </Post>
      {/*글쓴이만 글 삭제 및 수정 버튼 보이도록 설정*/}
      {user.userData._id === props.PostInfo.author._id ? (
        <BtnDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <button className="delete" onClick={() => Delete()}>
            삭제
          </button>
        </BtnDiv>
      ) : null}
    </PostDiv>
  );
}

export default Detail;
//export default Auth(Detail, true); //Detail의 경우 로그인되어있는 유저만 페이지 입장 가능
