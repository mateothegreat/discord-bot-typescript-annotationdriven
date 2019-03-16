import { DB }   from '../DB';
import { User } from '../Entities/User';

export class UsersService {

    public static getByDiscordId(id: number): Promise<User> {

        return DB.connection.getRepository(User)
                 .createQueryBuilder()
                 .select('*')
                 .where('discordUserId = :discordUserId')
                 .getRawOne();

    }

    public static create(user: User): Promise<User> {

        return DB.connection.manager.save(user);

    }

}
