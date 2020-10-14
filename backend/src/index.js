// const app = require('./app')
import app from './app'
let port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`port is listening  at ${port}`);
});
module.exports = server
// export default server

require("./websocket")


 