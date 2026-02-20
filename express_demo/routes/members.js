const express = require('express');
const router = express.Router();
const Joi = require('joi');

const members = [
  { id: 1, name: 'Sameer', age: 20 },
  { id: 2, name: 'Anshu', age: 19 },
  { id: 3, name: 'Anjali', age: 23 },
  { id: 4, name: 'Sumit', age: 18 },
  { id: 5, name: 'Manisha', age: 24 }
];

router.get('/', (req, res) => {
  res.send(members);
});

router.post('/', (req, res) => {
  const { error } = validateMember(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const member = {
    id: members.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  members.push(member);
  res.send(member);
});

router.get('/:id', (req, res) => {
  const member = members.find(c => c.id === parseInt(req.params.id));

  if (!member) return res.status(404).send('There is no member with given ID');

  res.send(member);
});

router.put('/:id', (req, res) => {
  const member = members.find(c => c.id === parseInt(req.params.id));

  if (!member) return res.status(404).send('There is no member with given ID');

  const { error } = validateMember(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  member.name = req.body.name;
  member.age = req.body.age;
  res.send(member);
});

router.delete('/:id', (req, res) => {
  const member = members.find(c => c.id === parseInt(req.params.id));

  if (!member) return res.status(404).send('There is no member with given ID');

  const index = members.indexOf(member);
  members.splice(index, 1);
  res.send(member);
});

function validateMember(member) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().required()
  });

  return schema.validate(member); // Modern Joi syntax
}

module.exports = router;
