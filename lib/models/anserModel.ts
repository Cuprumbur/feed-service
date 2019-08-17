import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AnswerSchema = new Schema({
    person_id: {
        type: Number,
        person_id: 'person_id is required'
    },
    name: {
        type: String,
        required: 'name is required'
    },
    questions: [{
        question: String,
        answer: String,
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});