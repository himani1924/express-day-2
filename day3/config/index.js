const config = {
    port: 3000,
    dbUser: 'postgres',
    database: 'employees',
    dbPassword: 'Himani@100',
    dbhost: 'localhost',
    dbPort: 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 10,
    GOOGLE_CLIENT_ID:'353225817783-jn5cjhp402btj43k67s072o6iillu6je.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'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',
    callback_url:'http://localhost:3000/api/v1/auth/google/callback',
    GITHUB_CLIENT_ID:'Ov23liZbF4etRUUOvAUZ',
    GITHUB_CLIENT_SECRET:'d4de0b068efd7a6be6b741e6944d4627a1e008cc',
    GITHUB_CALLBACK_URL:'http://localhost:3000/api/v1/auth/github/callback'


}
export default config;