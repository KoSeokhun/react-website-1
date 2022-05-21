import React, { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";

function ComMain() {
  const [PostList, setPostList] = useState([]);
  useEffect(() => {
    //return 구문이 아닌 그냥 코드를 쓸 경우 컴포넌트 생성 시에 훅을 걸어 줄 수 있으니 여기서 axios 통신
    axios
      .post("api/post/list")
      .then((response) => {
        if (response.data.success) {
          console.log("처음", response.data);
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <input type="text"></input>
        <button>응안돼</button>
      </div>
      <List PostList={PostList} />
    </div>
  );
}

export default ComMain;
