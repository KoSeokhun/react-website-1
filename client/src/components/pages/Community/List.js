import React from "react";
import { Link } from "react-router-dom";
import { ListDiv, ListItem, UploadButtonDiv } from "../../Style/ListCSS";
import moment from "moment";
import "moment/locale/ko";

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };
  return (
    <>
      <ListDiv>
        <UploadButtonDiv>
          <Link to="/upload">
            <button>글작성</button>
          </Link>
        </UploadButtonDiv>
        {props.PostList.map((post, index) => {
          console.log("게시글", post);
          return (
            <ListItem key={index}>
              <Link to={`/post/${post.postNum}`}>
                <p className="title">{post.title}</p>
                {/* <p className="author">{post.author.displayName}</p> */}
                <p>{post.content}</p>
                <p>{SetTime(post.createdAt, post.updatedAt)}</p>
              </Link>
            </ListItem>
          );
        })}
      </ListDiv>
    </>
  );
}
export default List;
