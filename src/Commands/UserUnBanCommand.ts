import { RichEmbed, User } from 'discord.js';
import { BOT }             from '../Common/Bot';
import { CommandBase }     from '../Common/CommandBase';
import { Command }         from '../Common/CommandDecorator';
import { CommandParser }   from '../Common/CommandParser';
import { Event }           from '../Common/Event';

/**
 * UnBans a user from the server. Usage: >unban name=someusername
 */
@Command
export class UserUnBanCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '>unban',
            group: 'users',
            description: 'UnBans a user from the server. Usage: >unban name=someusername',
            roles: [ 'admin' ],
            params: [ {

                name: 'name',
                description: 'Users name.',
                required: true,

            } ]

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        console.log(command.arguments);


        const bans = await BOT.client.guilds.first().fetchBans();

        if (bans.size > 0) {

            bans.find((user: User) => user.username === command.arguments[ 0 ].value);

            const user = bans.find((user: User) => user.username === command.arguments[ 0 ].value);

            if (user) {

                BOT.client.guilds.first().unban(user);

                command.obj.reply(new RichEmbed().setTitle(`Server UnBan`)
                                                 .setDescription(`The user with username "${ command.arguments[ 0 ].value }" has been un-banned.`));

            } else {

                command.obj.reply(new RichEmbed().setTitle(`Server UnBan`)
                                                 .setDescription(`Could not find a user with the username "${ command.arguments[ 0 ].value }"`));

            }

        } else {

            command.obj.reply(new RichEmbed().setTitle(`Server UnBan`)
                                             .setDescription(`There are currently no bans!`));

        }

    }

}
