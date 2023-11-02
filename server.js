const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/ultis/mongodb.ulti");

// Start server


async function StartServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}.`);
        });
    }catch (error) {
        console.log("can't connect to the database!",error);
        process.exit();
    }
}

module.exports = StartServer()

