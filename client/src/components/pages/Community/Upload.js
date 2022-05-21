import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";

function Upload(props) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }
    let body = {
      title: Title,
      content: Content,
    };

    axios
      .post("/api/post/submit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/community"); //  "/"에서 "/community" (리스트)로 변경 예정
        } else {
          alert("글 작성에 실패하였습니다");
        }
      })
      .catch((error) => {
        console.log("에러일떄", body);
        console.log(error);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        {/* <ImageUpload setImage={setImage} /> */}
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            글쓰기
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
