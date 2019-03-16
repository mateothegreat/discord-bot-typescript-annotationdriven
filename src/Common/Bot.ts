import * as Discord           from 'discord.js';
import { Message, RichEmbed } from 'discord.js';
import * as dotenv            from 'dotenv';
import { CommandBase }        from './CommandBase';
import { CommandParser }      from './CommandParser';

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

        this.client.on('message', (message: Message) => {

            this.handleMessage(message);

        });

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

        //
        // Prevent the bot from talking to itself (this would cause an endless loop).
        //
        if (!message.author.bot) {

            const command = new CommandParser(message);

            //
            // Run the preCommand validation checks before executing runCommand.
            //
            if (this.preCommand(command)) {

                this.runCommand(command);

            }

        }

    }

    /*
     * Perform validation checks.
     *
     * @param CommandParser commandParser The parsed command.
     *
     */
    public preCommand(parsedCommand: CommandParser): boolean {

        const command: CommandBase = this.getCommandByName(parsedCommand.command);

        if (!!command) {

            let errors: string[] = [];

            for (let i = 0; i < command.config.params.length; i++) {

                const argument = parsedCommand.getArgumentByName(command.config.params[ i ].name);

                if (command.config.params[ i ].required && !argument) {

                    errors.push(`The parameter "${ command.config.params[ i ].name }" (${ command.config.params[ i ].description }) is required.`);

                } else {

                    //
                    // Check to see if the argument passed exists in the commands accetpable parameters.
                    //
                    if (argument) {

                        const regex = new RegExp(command.config.params[ i ].pattern);

                        if (!argument.value.match(regex)) {

                            errors.push(`The parameter "${ command.config.params[ i ].name }" with the value "${ argument.value }" is invalid (Acceptable pattern: ${ command.config.params[ i ].pattern }).`);

                        }

                    }

                }


            }

            //
            // Send the error messages back to the user.
            //
            if (errors.length > 0) {

                parsedCommand.message.reply(new RichEmbed().setTitle('The following errors ocurred:')
                                                           .setDescription(errors.join("\n\t")));

                return false;

            } else {

                return true;

            }

        }

        //
        // Return true by default which means the command did not have any validations.
        //
        return true;

    }

    /*
     * Run a command
     *
     * @param string commandName Name of the command to run.
     *
     */
    public runCommand(command: CommandParser): void {

        for (let i = 0; i < this.commands.length; i++) {

            if (this.commands[ i ].config.name === command.command || this.commands[ i ].config.name === '*') {

                console.log(`Running Command: ${ this.commands[ i ].config.name }`);

                this.commands[ i ].run(command);

            }

        }

    }

    public getCommandByName(name: string): CommandBase {

        for (let i = 0; i < this.commands.length; i++) {

            if (this.commands[ i ].config.name === name) {

                return this.commands[ i ];

            }

        }

    }

}

export const BOT = new Bot();
