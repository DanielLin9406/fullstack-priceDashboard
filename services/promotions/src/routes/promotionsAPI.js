import promotionRouter from '../libs/router/router';
import promotion from '../db/promotions_db.json';

promotionRouter.get('/promotions', async (req, res) => {
  res.send(JSON.stringify(promotion));
});

promotionRouter.post('/promotions', async (req, res) => {
  const { name, start_date, end_date, items, apply_now } = req.body;
  res.send(JSON.stringify(promotion));
});

promotionRouter.put('/promotions/:id', async (req, res) => {
  const { name, start_date, end_date, items } = req.body;
  res.send(JSON.stringify(promotion));
});

promotionRouter.delete('/promotions/:id', async (req, res) => {
  res.send(JSON.stringify(promotion));
});

export default promotionRouter;
