import { Message } from 'discord.js';

export class CommandParser {

    public command: string;
    public arguments: string;
    public message: Message;

    public constructor(message: Message) {

        const matches = message.content.match(/>\s?(\w+)\s+(.*)/);

        if (!!matches && matches.length === 3) {

            this.command = matches[ 1 ];
            this.arguments = matches[ 2 ];
            this.message = message;
            
        }

    }

}
