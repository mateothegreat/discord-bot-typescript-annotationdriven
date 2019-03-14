import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';

@Command
export class TestCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            name: 'test'

        });

    }

    //
    // Called when a command matches config.name.
    //
    public run(command: CommandParser): void {

        command.message.reply('Test received!');

    }

}
