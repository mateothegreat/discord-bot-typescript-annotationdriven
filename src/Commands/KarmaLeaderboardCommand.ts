import { RichEmbed }     from 'discord.js';
import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';
import { DB }            from '../DB/DB';
import { KarmaPoint }    from '../DB/Entities/KarmaPoint';

/**
 * Displays the karma leaderboard.
 */
@Command
export class KarmaLeaderboardCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!leaderboard',
            group: 'fun',
            description: 'Displays the karma leaderboard.',

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const results = await DB.connection.getRepository(KarmaPoint)
                                .createQueryBuilder('karma_point')
                                .select([ 'to_userid', 'to_discriminator', 'to_username', 'COUNT(karma_point.id) AS total' ])
                                .orderBy('total', 'DESC')
                                .groupBy('to_userid,to_discriminator,to_username')
                                .limit(22)
                                .getRawMany();

        let fields: any[] = [];

        console.log(results);

        const embed = new RichEmbed().setTitle('Karma Points Leaderboard')
                                     .setColor(3447003);

        results.forEach(row => {

            embed.addField(`❯ ${ row.total } points`, `<@${ row.to_userid }>`);

        });

        command.obj.channel.send(embed);

    }

}
