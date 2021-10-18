import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: { transaction: Model },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance Landing Page',
          type: 'deposit',
          category: 'Web Development',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
          updatedAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Rent',
          type: 'withdrawal',
          category: 'House',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
          updatedAt: new Date('2021-02-14 11:00:00'),
        },
      ],
    });
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', schema => schema.all('transaction'));

    this.get('/transactions/:id', (schema, request) =>
      schema.db.transactions.find(request.params.id),
    );

    this.post('/transactions', (schema, request) =>
      schema.create('transaction', JSON.parse(request.requestBody)),
    );

    this.put('/transactions/:id', (schema, request) =>
      schema.db.transactions.update(
        request.params.id,
        JSON.parse(request.requestBody),
      ),
    );

    this.delete('/transactions/:id', (schema, request) => {
      schema.db.transactions.remove(request.params.id);

      return {};
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
