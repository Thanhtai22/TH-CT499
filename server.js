const app = require("./app");
const config = require("./app/config");

//start sv

const PORT = config.app.port;
app.listen(PORT, ()=>{
    console.log('Server is running on ${PORT}');
});