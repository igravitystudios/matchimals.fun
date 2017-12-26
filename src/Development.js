import React, { Fragment } from 'react';
import Card from './components/Card';
import Deck from './components/Deck';
import data from './data';

const Example = () => (
  <Fragment>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.deck.map((card, i) => (
        <div
          key={i}
          style={{
            display: 'inline-flex',
            margin: '4px',
          }}
        >
          <Card card={card} flipped />
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 400 }}>
      <Deck cards={data.deck} />
    </div>
  </Fragment>
);

export default Example;
