```js
const data = require('../../data');

data.deck.map((card, i) => (
  <div
    key={i}
    style={{
      display: 'inline-flex',
      margin: '4px',
    }}
  >
    <Card card={card} flipped />
  </div>
));
```
