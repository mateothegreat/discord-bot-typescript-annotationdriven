import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectIdea {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @Column()
    from_userid: string;

    @Column()
    from_discriminator: string;

    @Column()
    from_username: string;

    @Column()
    name: string;

    @Column({ type: "blob", nullable: true })
    description: string;

    @Column()
    git: string;

    @Column({ nullable: true })
    link: string;

    @Column()
    language: string;

    @Column({ default: 'Pending' })
    status: string;

    @Column({ default: 'Pending' })
    difficulty: string;

}
