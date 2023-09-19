const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Result",
    tableName: "result",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        last:{
            type:"numeric",
        },
        buy:{
            type:"numeric"
        },
        sell:{
            type:"numeric"
        },
        volume:{
            type:"numeric"
        },
        base_unit:{
            type:"varchar"
        }
    },
})