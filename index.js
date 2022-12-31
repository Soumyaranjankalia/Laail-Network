
const express = require('express');
const connect = require('./db/config')

const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

app.get('/users', (req, res) => {
    const userType = req.query.type; // either 'lender' or 'borrower'
    const collection = userType === 'lender' ? 'Users' : 'Contracts';
    db.collection(collection).find({}).toArray((err, users) => {
      if (err) {
        res.status(500).send({ error: 'Error fetching users' });
      } else {
        res.send(users);
      }
    });
  });

  
app.post('/lenders', (req, res) => {
    const lender = req.body;
    db.collection('Users').insertOne(lender, (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Error creating lender' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/lenders', (req, res) => {
    const n = parseInt(req.query.n);
    db.collection('Contracts').aggregate([
      // Group contracts by lender and count the number of borrowers for each lender
      {
        $group: {
          _id: '$lenderId',
          borrowerCount: { $sum: 1 },
          totalAmount: { $sum: '$principle' }
        }
      },
      // Only include lenders who have given loans to at least n borrowers
      { $match: { borrowerCount: { $gte: n } } }
    ]).toArray((err, lenders) => {
      if (err) {
        res.status(500).send({ error: 'Error fetching lenders' });
      } else {
        res.send(lenders);
      }
    });
  });
  
  