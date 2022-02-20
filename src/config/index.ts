import merge from 'lodash/merge';
import commonConfig from './common';

const ENV_MAP = {
  dev: 'dev',
  qa: 'qa',
  uat: 'uat',
  production: 'production',
};

const LOCAL_DEV_ENVIRONMENTS = [ENV_MAP.dev, ENV_MAP.qa, ENV_MAP.uat];
const env = process.env.NODE_ENV ?? '';

export const isLocalDev = () => LOCAL_DEV_ENVIRONMENTS.includes(env);
export const isProduction = () => [ENV_MAP.production].includes(env);
export const isDevelop = () => [ENV_MAP.qa].includes(env);

const getConfig = () => {
  const environment = isLocalDev() ? ENV_MAP.dev : env;
  const envConfig = require(`./${environment}`).default;

  const merged = merge(envConfig, commonConfig);

  return merged;
};

let config = getConfig();

export default config;
