const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, "The start date is required"],
  },
  end: {
    type: Date,
    required: [true, "The end date is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

EventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", EventSchema);
