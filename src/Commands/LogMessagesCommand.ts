import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';

/**
 * Logs all messages received to the database.
 */
@Command
export class LogMessagesCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '*',
            group: 'events',
            description: 'Logs all messages to the database.'

        });

    }

    //
    // Called when a command matches config.name.
    //
    public run(command: CommandParser): void {

        console.log(command.obj.content);

    }

}
