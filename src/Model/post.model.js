const { model, Schema } = require("mongoose");
const postSchema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: { type: String, required: true},
    likes: { type: Number, default: 0 }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
const postModel = model("post", postSchema);
module.exports = postModel;