import { RichEmbed }     from 'discord.js';
import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';
import { DB }            from '../DB/DB';
import { Macro }         from '../DB/Entities/Macro';

/**
 * Replies back to the user with "pong!"
 */
@Command
export class MacroAddCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '++add',
            group: 'macros',
            description: 'Create or replace a new macro. Usage: ++add name=docker,message=Check out https://docker.io!',
            roles: [ 'admin' ],
            params: [

                {
                    name: 'name',
                    required: true

                }, {

                    name: 'message',
                    required: true

                }

            ]

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        //
        // First we try to retrieve the macro by name.
        //
        const result = await DB.connection.getRepository(Macro)
                               .createQueryBuilder('Macro')
                               .select([ '*' ])
                               .where('name = :name', { name: command.arguments[ 0 ].value })
                               .getRawOne();

        //
        // Macro exists, so let's update it else we create a new one.
        //
        if (result) {

            result.name = command.arguments[ 0 ].value;
            result.message = command.arguments[ 1 ].value;

            DB.connection
              .createQueryBuilder()
              .update(Macro)
              .set(result)
              .where('id = :id', { id: result.id })
              .execute();

            command.obj.reply(new RichEmbed().setTitle('Update Macro').setDescription(`The macro \`++${ command.arguments[ 0 ].value }\` has been updated!`));

        } else {

            const macro: Macro = new Macro();

            macro.name = command.arguments[ 0 ].value;
            macro.message = command.arguments[ 1 ].value;

            DB.connection.manager.save(macro);

            command.obj.reply(new RichEmbed().setTitle('Create Macro').setDescription(`The macro \`++${ command.arguments[ 0 ].value }\` has been created!`));

        }

    }

}
