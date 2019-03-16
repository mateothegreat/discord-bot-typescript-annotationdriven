import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';

@Command
export class AllMessagesCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            name: '*',
            description: 'Logs all messages to the database.'

        });

    }

    //
    // Called when a command matches config.name.
    //
    public run(command: CommandParser): void {

        console.log(command.message.content);

    }

}
