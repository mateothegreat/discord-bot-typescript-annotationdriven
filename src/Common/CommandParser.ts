import { Message }         from 'discord.js';
import { CommandArgument } from './CommandArgument';

/**
 * Takes in a message and parses it out into a Command Class Instance.
 */
export class CommandParser {

    /**
     * Name of the command parsed out.
     */
    public command: string;

    /**
     * Arguments parsed out between commas.
     */
    public arguments: CommandArgument[] = [];

    /**
     * Discord.js Message Object.
     */
    public message: Message;

    /**
     * @description Class Constructor requiring a Discord.js Message Object.
     *
     * @param message Discord.js message object.
     *
     */
    public constructor(message: Message) {

        //
        // Match between spaces or to the end if no spaces found.
        // i.e.: `!ping` or `>test chars=abc,num=123
        //
        const matches = message.content.match(/^(.*?)(?:\s+|$)(.*)/);

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

        this.message = message;

    }

    /**
     * @description Retrives a parsed argument by it's name.
     *
     * @param commandName Name of the argument (name=somecommand).
     *
     * @returns CommandArgument CommandArgument or null if not found.
     *
     */
    public getArgumentByName(commandName: string): CommandArgument {

        for (let i = 0; i < this.arguments.length; i++) {

            if (this.arguments[ i ].name === commandName) {

                return this.arguments[ i ];

            }

        }

    }

}
