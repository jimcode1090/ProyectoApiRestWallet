import express from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { TestService } from "./services/test.service";
import {SubscriptionMYSQLRepository} from "./services/repositories/impl/mysql/subscription.repository";
import {SubscriptionService} from "./services/subscription.service";
import {MovementMySQLRepository} from "./services/repositories/impl/mysql/movement.repository";
import {BalanceMysqlRepository} from "./services/repositories/impl/mysql/balance.repository";
import {MovementService} from "./services/movement.service";


export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        //repositories
        subscriptionRepository: asClass(SubscriptionMYSQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMysqlRepository).scoped(),
        //services
        testService: asClass(TestService).scoped(),
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped()
    });

    app.use(scopePerRequest(container));
};