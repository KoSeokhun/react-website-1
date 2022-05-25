import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { PostDiv, BtnDiv, Post } from "../../Style/PostDetailCSS";

//문제1.props 전달이 안된다. -> 디테일 내부 값이 undefined
// react-router를 통해서는 props를 전달하는 방법으로 태그안에
// pathname(경로)이랑 state ={json}형식으로 데이터를 보내줘야하는디
//지정을 해줘도 인식을 못하는것같음.. 내가 잘못 지정했나?
// 문제1, 문제2 모두 state를 쓰니까 이름 다르게 해봐야겠다.

//문제2. user데이터가 없다. why? Upload.js에서는 잘 받아와지는걸.
//이거는 react redux사용, 상태관리
//store에 저장된 props를 어디서든 가져다 쓸 수 있음.

function Detail(props) {
  let params = useParams(); //postNum 추적용: postNum에 가지고 있는 정보를 띄워주는 -> useParams
  let navigate = useNavigate();
  const location = useLocation(); //Link to 에서 props 전달
  const postDetail = location.state;
  const user = useSelector((state) => state.user); //값이 로딩안된이유:순서다~!~!
  //nodemon으로 재시작하면서 store가 초기화 되기 때문에 무조건 로그아웃-로그인 부터
  //테스트케이스 !!!!!생각!!!!!!
  console.log(postDetail, "글쓰니");
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
  console.log(postDetail.author._id);
  console.log(user.userData._id);
  return (
    <PostDiv>
      <Post>
        <h1>{postDetail.title}</h1>
        <div className="author">
          <h3>{postDetail.nickname}</h3>
          {/* 아바타 컴포넌트 들어갈 자리 */}
          <p className="time">
            {SetTime(postDetail.createdAt, postDetail.updatedAt)}
            {/* moment.js 라는 라이브러리 사용: 시간 라이브러리 */}
          </p>
        </div>
        {/* 이미지 있으면 보여주고 없으면 패스 */}
        {postDetail.image ? (
          <img
            //src={`http://localhost:5002/${PostInfo.image}`} -> 서버에 저장용
            src={postDetail.image}
            alt=""
            style={{ width: "80%", height: "auto" }}
          />
        ) : null}
        <p>{postDetail.content}</p>
      </Post>
      {/*글쓴이만 글 삭제 및 수정 버튼 보이도록 설정*/}
      {user.userData._id === postDetail.author._id ? (
        <BtnDiv>
          <Link to={`/edit/${postDetail.postNum}`}>
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
//export default Auth(Detail, null); //Detail의 경우 로그인되어있는 유저만 페이지 입장 가능
