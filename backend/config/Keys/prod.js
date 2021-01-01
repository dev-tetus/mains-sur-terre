module.exports = {
  PORT: process.env.PORT,
  DB =  {
    DB_HOST: process.env.HOSTNAME,
    DB_USER: process.env.USERNAME,
    DB_PASSWORD: process.env.PASSWORD,
    DB_NAME: process.env.DATABASE,
  },
  REDIS = {
    PORT : process.env.REDIS_PORT,
    HOST: process.env.REDIS_HOST,
    PASSWORD: process.env.REDIS_PASSWORD,
    SECRET_KEY: process.env.REDIS_SECRET_KEY,
    SESSION_NAME: process.env.REDIS_SESSION_NAME,
  },
  MAIL_VERIFIER = {
    API_KEY = process.env.API_KEY
  },
  JWT: {
    ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REFRESH_KEY: process.env.SECRET_REFRESH_KEY
  }
  
};