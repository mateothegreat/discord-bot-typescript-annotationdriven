export class CommandConfig {

    public name: string;
    public params?: CommandParam[];

}

export class CommandParam {

    public name: string;
    public description?: string;
    public required?: boolean;
    public pattern?: string;
    public value?: string;

}
