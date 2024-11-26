const { usersService } = require('./../services');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.json(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.status(201).json(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const isExist = !!usersService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.update(+id, { name });

  res.json(updatedUser);
};

const removeOne = (req, res) => {
  const { id } = req.params;

  const isExist = !!usersService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteOne(+id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  removeOne,
};
