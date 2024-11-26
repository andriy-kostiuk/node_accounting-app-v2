const { expensesService, usersService } = require('./../services');
const { expenseSchema } = require('./../schemas');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expensesService.getAll({
    userId: +userId,
    categories,
    from,
    to,
  });

  res.json(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const create = (req, res) => {
  const { error, value } = expenseSchema.validate(req.body, {
    stripUnknown: true,
  });

  const isUserExist = !!usersService.getById(value.userId);

  if (error || !isUserExist) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(value);

  res.status(201).json(newExpense);
};

const removeOne = (req, res) => {
  const { id } = req.params;

  const isExist = !!expensesService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const isExist = !!expensesService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  const { error, value } = expenseSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (!error) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update(+id, value);

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  removeOne,
};
