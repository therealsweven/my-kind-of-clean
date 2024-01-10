const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  notes: {
    type: Boolean,
  },
  client: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  cleaning: { type: Schema.Types.ObjectId, ref: "Cleaning" },
});

const Invoice = model("Invoice", invoiceSchema);

module.exports = { Invoice };
