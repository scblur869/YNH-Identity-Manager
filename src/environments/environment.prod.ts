/*
export const environment = {
  production: true,
  auth_service: 'http://localhost:4000'
};
*/
export const environment = {
  production: true,
  environment: $ENV.ENVIRONMENT,
  Services: {
    auth_service: $ENV.AUTH_SVC
  }
};
