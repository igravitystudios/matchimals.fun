```js
const cards = require('../../constants/cards');

cards.deck.map((card, i) => (
  <Card
    key={i}
    card={card}
    flipped
    style={{
      display: 'inline-flex',
      margin: '4px',
    }}
  />
));
```
