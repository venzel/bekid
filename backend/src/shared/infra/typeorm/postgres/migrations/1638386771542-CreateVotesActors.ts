import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateVotesActors1638386771542 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'votes_actors',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'vote_id',
                        type: 'varchar',
                    },
                    {
                        name: 'actor_id',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'votes_actors',
            new TableForeignKey({
                name: 'FKVoteActorVote',
                referencedTableName: 'votes',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'votes_actors',
            new TableForeignKey({
                name: 'FKVoteActorActor',
                referencedTableName: 'actors',
                referencedColumnNames: ['id'],
                columnNames: ['actor_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'votes_actors',
            new TableForeignKey({
                name: 'FKVoteUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('votes_actors', 'FKVoteUser');

        await queryRunner.dropForeignKey('votes_actors', 'FKVoteActorActor');

        await queryRunner.dropForeignKey('votes_actors', 'FKVoteActorVote');

        await queryRunner.dropTable('votes_actors');
    }
}
