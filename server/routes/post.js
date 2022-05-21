var express = require("express");
var router = express.Router();
//const multer = require("multer");

//model 사용
const { Post } = require("../Models/Post.js");
const { Counter } = require("../Models/Counter.js");
//const { User } = require("../Model/User.js");
//모듈로써 이미지 외부저장 함수
//const setUpload = require("../Util/upload.js");

//글 제출
router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      console.log(temp);
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((error) => {
      console.log("글 제출 오류", error);
      res.status(400).json({ success: false });
    });
});

//글 목록
router.post("/list", (req, res) => {
  // Post.find()
  //   .populate("author") //키를 populate걸어준다 -> doc에 저장된 데이터 중 Obj ID로 저장된거 찾아서
  //   .exec()
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      console.log("글 목록 오류", err);
      res.status(400).json({ success: false });
    });
});
//글 세부
router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) }) //postNum을 string -> number로 형변환
    // .populate("author")
    .exec()
    .then((doc) => {
      console.log("글 세부 데이터", doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      console.log("에러에러");
      res.status(400).json({ success: false });
    });
});

//글 수정
router.post("/edit", (req, res) => {
  console.log("글수정로그");
  let temp = {
    title: req.body.title,
    content: req.body.content,
    //image: req.body.image,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("글 수정 오류", err);
      res.status(400).json({ success: false });
    });
});

//글 삭제
router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("글 삭제 오류", err);
      res.status(400).json({ success: false });
    });
});

module.exports = router; //이거 안해주면 403에러남
