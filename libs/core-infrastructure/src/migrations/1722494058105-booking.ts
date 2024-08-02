import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Booking1722494058105 implements MigrationInterface {
  tableName = 'bookings';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'start_time',
            type: 'timestamptz',
          },
          {
            name: 'end_time',
            type: 'timestamptz',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'version',
            type: 'int',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
