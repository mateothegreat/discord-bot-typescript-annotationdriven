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

            name: '>test',
            description: 'Simple test command that sends a reply if validation succeeds.',
            params: [ {

                name: 'chars',
                description: 'An argument containing a word.',
                required: true,
                pattern: '\\w+'

            }, {

                name: 'num',
                description: 'An argument containing numbers.',
                required: true,
                pattern: '\\d+'

            }, {

                name: 'opt',
                description: 'An optional argument.',
                required: false,

            } ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public run(command: CommandParser): void {

        // console.log(command);

        command.message.reply('Test received!');

    }

}
