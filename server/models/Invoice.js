const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  {
    services: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateOfCleaning: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    discount: {
      type: Number,
    },
    notes: {
      type: String,
    },
    deposit: {
      type: Boolean,
    },
    depositAmount: {
      type: Number,
    },
    depositPaid: {
      type: Boolean,
    },
    depositPaymentMethod: {
      type: String,
    },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    cleaning: { type: Schema.Types.ObjectId, ref: "Cleaning" },
  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = { Invoice };
