const typeorm = require("typeorm");
const path = require("path");
const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "saquib@123",
    database: "results",
    synchronize: true,
    logging:true,
    entities: [path.join(__dirname,"..","entities/**/*.js")],
})


module.exports = dataSource;