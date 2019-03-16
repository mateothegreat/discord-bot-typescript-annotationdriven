import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public createdDate: Date;

    @Column()
    public discordUserId: string;

    @Column()
    public discordUsername: string;

    @Column()
    public discrodDiscriminator: string;

}
