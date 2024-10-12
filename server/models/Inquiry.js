const { Schema, model } = require("mongoose");

const inquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
    location: {
      type: String,
    },
    commMethod: {
      type: String,
    },
    responded: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = model("Inquiry", inquirySchema);

module.exports = { Inquiry };
