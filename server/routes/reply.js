var express = require("express");
var router = express.Router();
const { Post } = require("../models/Post");
const { Reply } = require("../models/Reply");
const { User } = require("../models/User");

//댓글 제출
router.post("/submit", (req, res) => {
  let temp = {
    reply: req.body.reply,
    postId: req.body.postId,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const NewReply = new Reply(temp);
      NewReply.save(() => {
        Post.findOneAndUpdate(
          {
            _id: req.body.postId,
          },
          { $inc: { replyNum: 1 } }
        )
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

//댓글 리스트 가져오기
router.post("/replylist", (req, res) => {
  console.log("ddd 38 : " + req.body.postId);
  Reply.find({ postId: req.body.postId })
    .populate("author")
    .exec()
    .then((replyInfo) => {
      console.log("댓글리스트 통신 결과", replyInfo);
      //찾은 리스트 쭉 가져와서 replyList로 줍니다!
      return res.status(200).json({ success: true, ReplyList: replyInfo });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

// //댓글 수정
// router.post("/replyedit", (req, res) => {
//   let temp = {
//     //수정해야될수도있음
//     postId: req.body.postId,
//     reply: req.body.reply,
//     uid: req.body.uid,
//   };
//   Reply.findOneAndUpdate({ _id: req.body.replyId }, { $set: temp })
//     .exec()
//     .then(() => {
//       return res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       return res.status(400).json({ success: false });
//     });
// });

// //댓글 삭제
// router.post("replydelete", (req, res) => {
//   Reply.deleteOne({ _id: req.body.replyId })
//     .exec()
//     .then(() => {
//       Post.fineOneandUpdate(
//         { _id: req.body.postId },
//         { $inc: { replyNum: -1 } }
//       )
//         .exec()
//         .then(() => {
//           return res.status(200).json({ success: true });
//         });
//     })
//     .catch((err) => {
//       return res.status(400).json({ success: false });
//     });
// });

module.exports = router;
