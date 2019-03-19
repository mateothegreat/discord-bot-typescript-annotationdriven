import { Connection, createConnection } from 'typeorm';
import { Logger }                       from '../Common/Logger';
import { ChatMessage }                  from './Entities/ChatMessage';
import { KarmaPoint }                   from './Entities/KarmaPoint';
import { Macro }                        from './Entities/Macro';
import { ProjectIdea }                  from './Entities/ProjectIdea';
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
                    ChatMessage,
                    KarmaPoint,
                    Macro,
                    ProjectIdea

                ],
                synchronize: true,
                logging: true

            });

            Logger.log('Connected to database');

        } catch (e) {

            console.log(e);

        }

    }

}
