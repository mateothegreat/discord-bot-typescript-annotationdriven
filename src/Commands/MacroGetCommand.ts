import { RichEmbed }     from 'discord.js';
import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';
import { DB }            from '../DB/DB';
import { Macro }         from '../DB/Entities/Macro';

/**
 * Display a saved macro. Usage: +docker
 */
@Command
export class MacroGetCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '*',
            group: 'macros',
            description: 'Display a saved macro. Usage: +docker',
            params: [

                {

                    name: 'm',
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

        const matches = command.obj.content.match(/^\+([\w\d]+)$/);

        if (matches && matches.length === 2) {

            //
            // First we try to retrieve the macro by name.
            //
            const result = await DB.connection.getRepository(Macro)
                                   .createQueryBuilder('Macro')
                                   .select([ '*' ])
                                   .where('name = :name', { name: matches[ 1 ] })
                                   .getRawOne();

            if (result) {

                command.obj.channel.send(new RichEmbed().setTitle(result.name).setDescription(result.message));

            } else {

                command.obj.reply(new RichEmbed().setTitle(matches[ 1 ]).setDescription('macro does not exist :sob:'));

            }

        }

    }

}
