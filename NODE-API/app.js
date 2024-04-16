import express from 'express';

const app = express();

app.get('/user/all', (req, res) => {
  res.json({
    msg: 'working',
    user: [],
  });
});

app.listen(4000, () => {
  console.log('server running');
});
