const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio:{type: String},
    img:{type: String, required: true}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
const userModel = model("user", userSchema);
module.exports = userModel;