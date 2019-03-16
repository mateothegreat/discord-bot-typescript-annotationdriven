import { RichEmbed }     from 'discord.js';
import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';

/**
 * Sets a channel topic. Usage: >topic channel=mychannelname,topic=my new topic
 */
@Command
export class ChannelSetTopicCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '>topic',
            description: 'Sets a channel topic. Usage: >topic channel=mychannelname,topic=my new topic',
            roles: [ 'admin' ],
            params: [ {

                name: 'channel',
                description: 'Channel name.',
                required: true,
                pattern: '[\\d\\w]+'

            }, {

                name: 'topic',
                description: 'New topic to set.',
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
    public run(command: CommandParser): void {

        const channel = command.obj.guild.channels.find(channel => channel.name === command.arguments[ 0 ].value);

        if (channel) {

            channel.setTopic(command.arguments[ 1 ].value);

        }

        command.obj.reply(new RichEmbed().setTitle(`Channel Topic Set for ${ command.arguments[ 0 ].value }`)
                                         .setDescription(`${ command.arguments[ 1 ].value }`));

    }

}
