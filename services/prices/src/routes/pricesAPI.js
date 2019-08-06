import priceRouter from '../libs/router/router';
import price from '../db/prices_db.json';

priceRouter.get('/prices', async (req, res) => {
  res.send(JSON.stringify(price));
});

export default priceRouter;
