import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ListDiv, ListItem, UploadButtonDiv } from "../../Style/ListCSS";

function List(props) {
  const [PostList, setPostList] = useState([]);
  const navigate = useNavigate;

  useEffect(() => {
    //return 구문이 아닌 그냥 코드를 쓸 경우 컴포넌트 생성 시에 훅을 걸어 줄 수 있으니 여기서 axios 통신
    axios
      .post("api/post/list")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <UploadButtonDiv>
        <button
          onClick={() => {
            navigate("/upload");
          }}
        >
          글쓰기
        </button>
      </UploadButtonDiv>
      <ListDiv>
        {PostList.map((post, index) => {
          console.log("게시글", post);
          return (
            <ListItem key={index}>
              <Link to={`/post/${post.postNum}`}>
                <p className="title">{post.title}</p>
                {/* <p className="author">{post.author.displayName}</p> */}
                <p>{post.content}</p>
              </Link>
            </ListItem>
          );
        })}
      </ListDiv>
    </>
  );
}
export default List;
