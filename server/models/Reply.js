const mongoose = require("mongoose");
//const { default: userSlice } = require("../../client/src/Reducer/userSlice.js");

//댓글용 스키마
const replySchema = new mongoose.Schema(
  {
    reply: String,
    author: {
      //DB간 연동을 위해서 userID에 해당하는 모든 정보가 author에 해당
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      //Ref 설정하지 않은 이유: 어떠한 포스트에 등록되어있는지만 확인할거라
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { collection: "replies", timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = { Reply };
