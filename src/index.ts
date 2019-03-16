/**
 * Main bootstrap file that instantiates the database connection and Bot class.
 */
import { BOT } from './Common/Bot';
import { DB }  from './DB/DB';

/**
 * Connect to the database.
 */
DB.connect();

/**
 * Starts the bot.
 */
BOT.start();
