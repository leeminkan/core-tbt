import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategory1722852762450 implements MigrationInterface {
  name = 'ProductCategory1722852762450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_categories" 
      ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "id" SERIAL NOT NULL, 
      "name" character varying(64) NOT NULL, 
      "description" text NOT NULL, 
      "parent_id" integer, CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" ADD CONSTRAINT "FK_5f151d414daab0290f65b517ed4" FOREIGN KEY ("parent_id") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_categories" DROP CONSTRAINT "FK_5f151d414daab0290f65b517ed4"`,
    );
    await queryRunner.query(`DROP TABLE "product_categories"`);
  }
}
