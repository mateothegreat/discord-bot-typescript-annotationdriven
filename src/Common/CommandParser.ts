import { Message }                     from 'discord.js';
import { CommandConfig, CommandParam } from './CommandConfig';

export class CommandParser {

    public command: string;
    public arguments: CommandParam[] = [];
    public message: Message;

    public constructor(message: Message) {

        const matches = message.content.match(/^(.*?)\s+(.*)/);

        if (!!matches && matches.length === 3) {

            this.command = matches[ 1 ];

            const split = matches[ 2 ].split(',');

            for (let i = 0; i < split.length; i++) {

                const splitRow = split[ i ].split('=');

                this.arguments.push({

                    name: splitRow[ 0 ],
                    value: splitRow[ 1 ]

                });

            }

        }

        // this.message = message;

    }

    public getArgumentByName(name: string): CommandConfig {

        for (let i = 0; this.arguments.length; i++) {

            if (this.arguments[ i ].name === name) {

                return this.arguments[ i ];

            }

        }

    }

}
