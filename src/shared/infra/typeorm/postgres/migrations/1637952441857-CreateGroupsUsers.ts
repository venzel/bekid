import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateGroupsUsers1637952441857 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'GROUPS_USERS',
                columns: [
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
            'GROUPS_USERS',
            new TableForeignKey({
                name: 'FKGroupUser',
                referencedTableName: 'GROUPS',
                referencedColumnNames: ['id'],
                columnNames: ['group_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'GROUPS_USERS',
            new TableForeignKey({
                name: 'FKUserGroup',
                referencedTableName: 'USERS',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('GROUPS_USERS', 'FKUserGroup');

        await queryRunner.dropForeignKey('GROUPS_USERS', 'FKGroupUser');

        await queryRunner.dropTable('GROUPS_USERS');
    }
}
