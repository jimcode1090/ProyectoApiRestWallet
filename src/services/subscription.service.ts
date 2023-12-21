import {SubscriptionRepository} from "./repositories/subscription.repository";
import {Subscription} from "./repositories/domain/subscription";
import {ApplicationException} from "../common/exceptions/application.exception";
import { SubscriptionUpdateDto, SubscriptionCreateDto } from "../dtos/subscription.dto";

export class SubscriptionService {

    constructor(private readonly subscriptionRepository: SubscriptionRepository) {
    }

    public async find(id: number): Promise<Subscription | null>{
        return await this.subscriptionRepository.find(id);
    }

    public async all(): Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }

    public async store(entry: SubscriptionCreateDto): Promise<void>{
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);
        if (!originalEntry){
            await this.subscriptionRepository.store(entry as Subscription);
        } else {
            throw new ApplicationException('La suscripción de usuario ya existe.');
        }
    }

    public async upate(id: number, entry: SubscriptionUpdateDto): Promise<void>{
        const originalEntry = await this.subscriptionRepository.find(id);
        if (originalEntry){
            originalEntry.code = entry.code;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            await this.subscriptionRepository.update(originalEntry);
        } else {
            throw new ApplicationException('La suscripción no existe.');
        }

    }

    public async remove(id: number): Promise<void>{
        return this.subscriptionRepository.remove(id);
    }

}