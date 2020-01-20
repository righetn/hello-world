const config = require('../config.json');

console.log(config.PGHOST);
const Pool = require('pg').Pool;
const postgres_config = {
    user: 'postgres',
    password: '123',
    host: config.PGHOST,
    port: 5432,
    database: 'mydb',
    ssl: false
}
const pool = new Pool(postgres_config);
let userNames = [];
//${[...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('')}
setInterval(() => {
    pool.query(`SELECT * FROM postUser('Paul Ochon')`,
        (error, results) => {
            if (error) {
                console.log("caca")
                console.log(error);
            }
            else
                console.log(results);
        }
    );
}, 1300);
setInterval(() => {
    pool.query(`SELECT * FROM getUsers()`,
        (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows[0].name);
                userNames = results.rows;
            }
        }
    );
}, 2000);

const http = require('http');

const server = http.createServer(function (request, response) {

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(`<div class="container">
    <div class="jumbotron">
        <h1>Command center</h1>
    </div>

    <div class="row">
        <div class="col-6">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                ${userNames.map((name, index) => `
                    <tr>
                        <td>${index}</td>
                        <td>${name.name}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
        </div>
    </div>
</div>`);

});

const port = 3000;
server.listen(port);

console.log("Server running at http://localhost:%d", port);