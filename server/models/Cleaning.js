const { Schema, model } = require("mongoose");

const cleaningSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  notes: {
    type: Boolean,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  client: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  property: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  invoice: { type: Schema.Types.ObjectId, ref: "Invoice" },
});

const Cleaning = model("Cleaning", cleaningSchema);

module.exports = { Cleaning };
