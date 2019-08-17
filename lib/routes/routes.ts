import { Request, Response } from "express";
import { AnswerController } from "../controllers/answerController";

export class Routes {

    public contactController: AnswerController = new AnswerController()

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Answer 
        app.route('/Answer')
            .get(this.contactController.getAnswers)

            // POST endpoint
            .post(this.contactController.addNewAnswer);

        app.route('/answer/:_id')
            .get(this.contactController.getAnswerWithID)
            .put(this.contactController.updateAnswer)
            .delete(this.contactController.deleteQuiz)
    }
}