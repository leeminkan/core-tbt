export abstract class BaseMapper<DomainEntity, OrmSchema> {
  abstract mapToORM(userEntity: DomainEntity): OrmSchema;

  abstract mapToDomain(userOrm: OrmSchema): DomainEntity;
}
