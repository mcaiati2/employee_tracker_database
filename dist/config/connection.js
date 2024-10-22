import pg from 'pg';
const { Client } = pg;
const client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'winery_app_db'
});
await client.connect();
export default client;
//# sourceMappingURL=connection.js.map