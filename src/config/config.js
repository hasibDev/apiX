module.exports = {
   development: {
      username: 'root',
      password: '',
      database: 'database_development',
      host: '127.0.0.1',
      dialect: 'mysql'
   },
   test: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql'
   },
   production: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_CLIENT,

   }
}
