import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateGroupQueue1638210399524 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'group_queue',
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
            'group_queue',
            new TableForeignKey({
                name: 'FKGroupQueueGroup',
                referencedTableName: 'groups',
                referencedColumnNames: ['id'],
                columnNames: ['group_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'group_queue',
            new TableForeignKey({
                name: 'FKGroupQueueUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('group_queue', 'FKGroupQueueUser');

        await queryRunner.dropForeignKey('group_queue', 'FKGroupQueueGroup');

        await queryRunner.dropTable('group_queue');
    }
}
