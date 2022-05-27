import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import moment from "moment";
import "moment/locale/ko";
//import Auth from "../../../hoc/auth";

function List(props) {
  const user = useSelector((state) => state.user.userData); //값이 로딩안된이유:순서다~!~!
  console.log("현재 유저", user);
  console.log("PostList", props);
  //이 props는 ComMain.js의 PostList = {PostList}
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };
  return (
    <ListDiv>
      {/* 여기서 게시글 전체 수(index)를 키값으로 주고 
      그만큼 post라는 이름으로 데이터 돌려줌 */}

      {props.PostList.map((post, index) => {
        return (
          <ListItem key={index}>
            <Link
              to={`/post/${post.postNum}`}
              state={{
                postNum: post.postNum,
                title: post.title,
                nickname: post.author.Nickname,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                image: post.image,
                author: post.author,
              }}
            >
              <p className="title">{post.title}</p>
              <div className="author">
                <p> {/*post.author.Nickname*/}</p>
                <p className="time">
                  {SetTime(post.createdAt, post.updatedAt)}
                </p>
              </div>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}
export default List;
// export default Auth(List, null);
