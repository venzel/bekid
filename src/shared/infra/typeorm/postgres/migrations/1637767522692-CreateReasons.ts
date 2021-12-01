import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateReasons1637767522692 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reasons',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'emotion_id',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
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
            'reasons',
            new TableForeignKey({
                name: 'FKReasonEmotion',
                referencedTableName: 'emotions',
                referencedColumnNames: ['id'],
                columnNames: ['emotion_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('reasons', 'FKReasonEmotion');

        await queryRunner.dropTable('reasons');
    }
}
