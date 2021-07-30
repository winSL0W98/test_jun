import React, {useState, useEffect} from 'react';
import './App.css';
import crypto from 'crypto';

const App = () => {
  const [orders, setOrders] = useState([]);
  const privateKey = '8e49ff607b1f46e1a5e8f6ad5d312a80';
  const publicKey = '38cd79b5f2b2486d86f562e3c43034f8';
  const shasum = crypto.createHash('sha1');

  const getPassword = (password) => shasum.update(password, "binary").digest('hex');

  useEffect(() => {
    fetch('/oauth/requesttoken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(r => {
        return fetch(`/oauth/accesstoken?oauth_token=${r.RequestToken}&username=${publicKey}&password=${getPassword(r.RequestToken + privateKey)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        })

        .then(response => response.json())
        .then(r => {
          return fetch(`/orders?oauth_token=${r.AccessToken}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
        })
        .then(response => response.json() )
        .then(r => (setOrders(r.Result)))

  }, [])
  return (
    <div className="App">
      {orders.map((order) =>
          <div key={order.Id}>{order.Title}</div>
      )}
    </div>
  );
};

export default App;
