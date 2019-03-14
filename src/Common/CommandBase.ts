import { CommandConfig } from './CommandConfig';
import { CommandParser } from './CommandParser';

export class CommandBase {

    public config: any;

    public constructor(config: CommandConfig) {

        this.config = config;

    }

    public run(command: CommandParser): void {

    }

}
