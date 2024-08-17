import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthProviderAndPropertiesColumnToSession1723876638001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_auth_provider_enum" AS ENUM('internal', 'keycloak')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "auth_provider" "public"."sessions_auth_provider_enum" NOT NULL DEFAULT 'internal'`,
    );
    await queryRunner.query(`ALTER TABLE "sessions" ADD "properties" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "properties"`);
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP COLUMN "auth_provider"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sessions_auth_provider_enum"`);
  }
}
