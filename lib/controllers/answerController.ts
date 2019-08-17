import * as mongoose from 'mongoose';
import { AnswerSchema } from '../models/anserModel';
import { Request, Response } from 'express';
import request = require('request');

const Answer = mongoose.model('Answer', AnswerSchema);
const AnalizeHook = process.env.ANALIZEHOOK;
const EmitAnalizeHook = (answer_id: string) => {
    request.post(
        AnalizeHook,
        { json: { answer_id, msg: 'updated' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            else {
                console.log(error);
            }
        }
    );
};

export class AnswerController {

    public addNewAnswer(req: Request, res: Response) {
        let newAnswer = new Answer(req.body);

        newAnswer.save((err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
            EmitAnalizeHook(answer._id);
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
        Answer.findById(req.params._id, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
        });
    }

    public updateAnswer(req: Request, res: Response) {
        Answer.findOneAndUpdate(req.params._id, req.body, { new: true }, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json(answer);
        });
    }

    public deleteQuiz(req: Request, res: Response) {
        Answer.remove(req.params._id, (err, answer) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted answer!' });
        });
    }

}