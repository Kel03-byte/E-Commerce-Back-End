const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Sorry, There is no Category with that Id!' });
      return
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Sorry, there is no Category with that Id!' });
      return;
    }
    res.status(200).json({ message: `Category id #${req.params.id} has been updated` });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Sorry, there is no Category with that Id!' });
      return;
    }
    res.status(200).json({ message: `Category id #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
