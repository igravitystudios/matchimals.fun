const Server = require('boardgame.io/server');
const Matchimals = require('../src/Game');

const app = Server({ games: [Matchimals] });

app.listen(3333, () => console.log('server running on http://localhost:3333'));
