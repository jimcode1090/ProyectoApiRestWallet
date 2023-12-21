import {Request, Response} from 'express';
import {DELETE, GET, POST, PUT, route} from "awilix-express";
import {SubscriptionService} from "../services/subscription.service";
import {BaseController} from "../common/controllers/base.controller";
import { SubscriptionUpdateDto, SubscriptionCreateDto } from "../dtos/subscription.dto";
@route('/subscriptions')
export class SubscriptionController extends BaseController{

    constructor(private readonly subscriptionService: SubscriptionService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(await this.subscriptionService.all());
        }catch (e) {
            this.handleException(e, res);
        }
    }
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.subscriptionService.find(id);
            if (result){
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        }catch (e) {
            this.handleException(e, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.subscriptionService.store({
                user_id: req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto);

            res.send();
        }catch (e) {
            this.handleException(e, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.upate(id, {
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionUpdateDto);

            res.send();
        }catch (e) {
            this.handleException(e, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {

        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.remove(id);

            res.send();
        }catch (e) {
            this.handleException(e, res);
        }
    }

}