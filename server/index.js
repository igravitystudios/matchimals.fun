import Server from 'boardgame.io/server';
import Game from '../src/Game';

const app = Server({ games: [Game] });

app.listen(3333, () => console.log('server running on http://localhost:3333'));
