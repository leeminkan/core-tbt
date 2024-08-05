export abstract class BaseMapper<DomainEntity, InfrastructureSchema> {
  abstract mapToORM(userEntity: DomainEntity): InfrastructureSchema;

  abstract mapToDomain(userOrm: InfrastructureSchema): DomainEntity;
}
