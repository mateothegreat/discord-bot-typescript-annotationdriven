import { BOT } from './Bot';

//
// @Command Class Annotation
//
export function Command(target: any): any {

    //
    // Register the class annotated with @Command
    //
    BOT.register(new target());

}
