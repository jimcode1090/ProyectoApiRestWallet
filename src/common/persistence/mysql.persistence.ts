import {createPool} from 'mysql2/promise';
import {Pool} from "mysql2/promise";

export class MysqlPool {
    public createMysqlPool(): Pool {
        return createPool({
            host: process.env.DB_MYSQL_HOST as string,
            user: process.env.DB_MYSQL_USER as string,
            port: parseInt(process.env.DB_MYSQL_PORT!),
            password: process.env.DB_MYSQL_PASSWORD as string,
            database: process.env.DB_MYSQL_DATABASE as string,
            decimalNumbers: true,

        });
    }
}

