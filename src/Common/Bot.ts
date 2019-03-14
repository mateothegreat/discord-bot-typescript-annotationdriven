import * as Discord      from 'discord.js';
import { Message }       from 'discord.js';
import * as dotenv       from 'dotenv';
import { CommandBase }   from './CommandBase';
import { CommandParser } from './CommandParser';

//
// Load .env into process.env
//
dotenv.config();

class Bot {

    //
    // Discord.js Client
    //
    private client: any = new Discord.Client();

    //
    // Array of Command Class References
    //
    private commands: Array<CommandBase> = [];

    //
    // Called by the @Command decorated classes
    //
    public register(commandRef: CommandBase): void {

        this.commands.push(commandRef);

        console.log(`Command Registerd: ${ commandRef.config.name }`);

    }

    //
    // Start the bot up
    //
    public start(): void {

        this.client.on('message', (message: Message) => this.handleMessage(message));

        this.client.login(process.env.TOKEN);

        //
        // Load Command Classes
        //
        require('../Commands');

        console.log('Bot Started');

    }

    /*
     * Handle an incoming message.
     *
     * @param Message message Discord message object.
     *
     */
    public handleMessage(message: Message): void {

        const command = new CommandParser(message);

        this.runCommand(command);

    }

    /*
     * Run a command
     *
     * @param string commandName Name of the command to run.
     *
     */
    public runCommand(command: CommandParser): void {

        for (let i = 0; i < this.commands.length; i++) {

            if (this.commands[ i ].config.name === command.command) {

                this.commands[ i ].run(command);

                console.log(`Command Ran: ${ this.commands[ i ].config.name }`);

            }

        }

    }

}

export const BOT = new Bot();
