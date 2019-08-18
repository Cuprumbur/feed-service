import * as mongoose from 'mongoose';
import { AnswerSchema } from '../models/anserModel';
import { Request, Response } from 'express';
import aws = require('aws-sdk');

const queueUrl = process.env.ANALIZEHOOK;
const sqs = new aws.SQS();
const EmitAnalizeHook = function (answer_id: string) {
    const params = {
        MessageBody: answer_id,
        QueueUrl: queueUrl,
        DelaySeconds: 0
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
};

const Answer = mongoose.model('Answer', AnswerSchema);
export class AnswerController {

    public addNewAnswer(req: Request, res: Response) {
        let newAnswer = new Answer(req.body);

        newAnswer.save((err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
            EmitAnalizeHook(answer.id);
        });
    }

    public getAnswers(req: Request, res: Response) {
        Answer.find({}, (err, answers) => {
            if (err) {
                res.send(err);
            }
            res.json(answers);
        });
    }

    public getAnswerWithID(req: Request, res: Response) {
        Answer.findById({ _id: req.params["_id"] }, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
        });
    }

    public updateAnswer(req: Request, res: Response) {
        Answer.findOneAndUpdate({ _id: req.params["_id"] }, req.body, { new: true }, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
        });
    }

    public deleteQuiz(req: Request, res: Response) {
        Answer.remove({ _id: req.params["_id"] }, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted answer!' });
        });
    }

}