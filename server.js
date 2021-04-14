const express = require('express');

const logger = require('./lib/logger');
const { validateAgainstSchema } = require('./lib/validation');
const { LodgingSchema } = require('./models/lodging');

const app = express();
const port = process.env.PORT || 8000;

const lodgings = require('./lodgings');

app.use(express.json());

app.use(logger);

app.get('/lodgings', (req, res) => {
  res.status(200).send({
    lodgings: lodgings
  });
});

app.post('/lodgings', (req, res, next) => {
  console.log("  -- req.body:", req.body);
  if (validateAgainstSchema(req.body, LodgingSchema)) {
    lodgings.push(req.body);
    const id = lodgings.length - 1;
    res.status(201).send({
      id: id
    });
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Lodging."
    });
  }
});

app.get('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    res.status(200).send(lodgings[id]);
  } else {
    next();
  }
});

app.put('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    if (validateAgainstSchema(req.body, LodgingSchema)) {
      lodgings[id] = req.body;
      res.status(204).send();
    } else {
      res.status(400).send({
        err: "Request body does not contain a valid Lodging."
      });
    }
  } else {
    next();
  }
});

app.delete('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    lodgings[id] = null;
    res.status(204).send();
  } else {
    next();
  }
});

app.use('*', (req, res, next) => {
  res.status(404).send({
    err: "The path " + req.originalUrl + " doesn't exist"
  });
});

app.listen(port, () => {
  console.log("== Server is listening on port:", port);
});
