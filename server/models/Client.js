const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quoted: {
    type: Boolean,
  },
  cleanings: [{ type: Schema.Types.ObjectId, ref: "Cleaning" }],
});

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    commMethod: {
      type: String,
    },
    subscribe: {
      type: Boolean,
    },
    verified: {
      type: Boolean,
    },
    properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

// set up pre-save middleware to create password
clientSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
clientSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Property = model("Property", propertySchema);
const Client = model("Client", clientSchema);

module.exports = { Client, Property };
