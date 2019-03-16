import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User }                                                                           from './User';

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public stampCreated: Date;

    @OneToOne(type => User)
    @JoinColumn()
    public user: User;

    @Column({ type: "blob" })
    public content: string;

    @Column()
    public channel: string;

}
