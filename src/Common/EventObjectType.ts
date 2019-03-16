import { GuildMember }   from "discord.js";
import { CommandParser } from './CommandParser';

export type EVENT_OBJECT = CommandParser | GuildMember;
