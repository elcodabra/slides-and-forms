import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

// Schemas
const FormSchema = new Schema({
  question: { type: String, required: true },
  description: { type: String, required: false },
  type: {
    type: String,
    enum: ['radio', 'checkbox', 'text'],
    required: true
  },
  variants: [{ type: String, required: true }],
  correct: [{ type: String, required: true }],
  hints: [{ type: String, required: false }]
});

const ContentSchema = new Schema({
  num: { type: Number, required: true },
  description: { type: String, required: false },
  form: { type: FormSchema, required: false },
  note: { type: String, required: false }
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  content: [ContentSchema],
  css_style: { type: String, required: false },
  userId: { type: String, required: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
