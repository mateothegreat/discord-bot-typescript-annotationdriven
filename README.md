# Creating new Commands
Place a class in the Commands directory annotated with `@Command` 
and it will be picked up dynamically.

```typescript
@Command
export class TestCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            name: 'test'

        });

    }

    //
    // Called when a command matches config.name.
    //
    public run(command: CommandParser): void {

        command.message.reply('Test received!');

    }

}
```
