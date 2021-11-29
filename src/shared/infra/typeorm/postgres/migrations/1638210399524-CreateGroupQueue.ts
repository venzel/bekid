import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateGroupQueue1638210399524 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'GROUP_QUEUE',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'group_id',
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
            'GROUP_QUEUE',
            new TableForeignKey({
                name: 'FKGroupQueueGroup',
                referencedTableName: 'GROUPS',
                referencedColumnNames: ['id'],
                columnNames: ['group_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'GROUP_QUEUE',
            new TableForeignKey({
                name: 'FKGroupQueueUser',
                referencedTableName: 'USERS',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('GROUP_QUEUE', 'FKGroupQueueUser');

        await queryRunner.dropForeignKey('GROUP_QUEUE', 'FKGroupQueueGroup');

        await queryRunner.dropTable('GROUP_QUEUE');
    }
}
