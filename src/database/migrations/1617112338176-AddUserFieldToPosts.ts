import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserFieldToPosts1617112338176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('posts', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('posts', new TableForeignKey({
            name: 'PostUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('posts', 'PostUser');

        await queryRunner.dropColumn('posts', 'user_id');
    }
}
