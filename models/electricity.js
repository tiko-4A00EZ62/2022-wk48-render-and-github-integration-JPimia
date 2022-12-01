const connection = require("../db/connection");

const electricity = {
    findAll: () =>
        new Promise((resolve, reject) => {
            connection.query("SELECT * FROM electricity;", (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    findById: (id) =>
        new Promise((resolve, reject) => {
            const selectQuery = "SELECT * FROM electricity WHERE id=?;";
            connection.query(selectQuery, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    save: (electricity) =>
        new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO electricity SET ?",
                electricity,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                }
            );
        }),
    deleteById: (id) =>
        new Promise((resolve, reject) => {
            const deleteQuery = "DELETE FROM electricity WHERE id=?;";
            connection.query(deleteQuery, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    updateById: (electricity) =>
        new Promise((resolve, reject) => {
            const updateQuery =
                "UPDATE electricity SET name = ?, country = ? WHERE id = ?;";
            connection.query(
                updateQuery,
                [electricity.name, electricity.country, electricity.id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        }),
};
module.exports = electricity;
