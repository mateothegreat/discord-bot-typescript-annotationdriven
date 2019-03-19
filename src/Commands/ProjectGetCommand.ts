import { RichEmbed }     from 'discord.js';
import { CommandBase }   from '../Common/CommandBase';
import { Command }       from '../Common/CommandDecorator';
import { CommandParser } from '../Common/CommandParser';
import { Event }         from '../Common/Event';
import { DB }            from '../DB/DB';
import { ProjectIdea }   from '../DB/Entities/ProjectIdea';

/**
 * Display a saved macro. Usage: +docker
 */
@Command
export class ProjectGetCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: ';;project',
            group: 'projects',
            description: 'Display a submitted project. Usage: ;;project <id>',
            params: [

                {

                    name: 'id',
                    description: 'Projet ID (optional)'

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
        // Output a single project else dump all.
        //
        if (command.namedarguments.id) {

            //
            // First we try to retrieve the project by id.
            //
            const result: ProjectIdea = await DB.connection.getRepository(ProjectIdea)
                                                .createQueryBuilder('ProjectIdea')
                                                .select([ '*' ])
                                                .where('id = :id', { id: command.namedarguments.id })
                                                .getRawOne();

            if (result) {

                command.obj.channel.send(new RichEmbed().setTitle(`#${ result.id }`)
                                                        .addField('Project Name', result.name)
                                                        .addField('Project Description', result.description ? result.description : '_no description_')
                                                        .addField('Git Repository', result.git)
                                                        .addField('Link', result.link ? result.link : '_no link provided_')
                                                        .addField('Status', result.link ? result.status : '_not approved yet_')
                                                        .addField('Difficulty', result.link ? result.difficulty : '_not ranked yet_')
                                                        .addField('Language', result.link ? result.language : '_no link provided_')
                                                        .addField('Submitted By', `<@${ result.from_userid }>`)
                                                        .addField('Date Submitted', result.createdDate));

            } else {

                command.obj.reply(new RichEmbed().setTitle('No Project Found').setDescription(`There is no project id ${ command.namedarguments.id } :sob:`));

            }

        } else {

            const results: Array<ProjectIdea> = await DB.connection.getRepository(ProjectIdea)
                                                        .createQueryBuilder('ProjectIdea')
                                                        .select([ '*' ])
                                                        .getRawMany();

            const embed = new RichEmbed().setTitle('Top Project Ideas');

            results.forEach(project => {

                embed.addField(`#${ project.id }`, `${ project.name } (${ project.language }): ${ project.git }`);

            });

            command.obj.reply(embed);

        }

    }

}
