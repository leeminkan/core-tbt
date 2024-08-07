import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategoryAssociation1722913010833
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_category_associations" 
      ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "product_id" integer NOT NULL, 
      "category_id" integer NOT NULL, 
      CONSTRAINT "PK_9176c2993877eec895e1d138389" PRIMARY KEY ("product_id", "category_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_associations" ADD CONSTRAINT "FK_be6bbe97709b14809aa92662ca4" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_associations" ADD CONSTRAINT "FK_98b4fd7055aacee777aef1a9181" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_category_associations" DROP CONSTRAINT "FK_98b4fd7055aacee777aef1a9181"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_associations" DROP CONSTRAINT "FK_be6bbe97709b14809aa92662ca4"`,
    );
    await queryRunner.query(`DROP TABLE "product_category_associations"`);
  }
}
