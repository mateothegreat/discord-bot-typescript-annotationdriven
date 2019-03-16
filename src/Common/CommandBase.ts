import { CommandConfig } from './CommandConfig';
import { CommandParser } from './CommandParser';

/*
 * Base class that all commands inherit from.
 *
 */
export class CommandBase {

    public config: any;

    public constructor(config: CommandConfig) {

        this.config = config;

    }

    public run(command: CommandParser): void {

    }

}
