- Ref: https://medium.com/@disa2aka/docker-deployments-for-keycloak-and-postgresql-e75707b155e5

## Flow

1. GET `http://localhost:3000/api/v1/auth/keycloak-sso`, it will redirect to auth provider page
2. At auth provider page, login and it will redirect to http://localhost:3000/api/v1/auth/keycloak-callback
3. GET `{{CORE_HOST}}/api/v1/auth/logout` and click the logoutUrl to logout. It will redirect to auth provider page
