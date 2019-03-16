import { BOT } from './Common/Bot';
import { DB }  from './DB/DB';

DB.connect();
BOT.start();
