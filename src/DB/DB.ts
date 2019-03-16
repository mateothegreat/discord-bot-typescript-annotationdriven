import { Connection, createConnection } from 'typeorm';
import { ChatMessage }                  from './Entities/ChatMessage';
import { User }                         from './Entities/User';

export class DB {

    public static connection: Connection;

    public static async connect() {

        try {

            console.log(__dirname);

            this.connection = await createConnection({

                type: "mysql",
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                entities: [

                    User,
                    ChatMessage

                ],
                synchronize: true,
                logging: true

            });

            console.log('Connected to database');

        } catch (e) {

            console.log(e);

        }

    }

}
