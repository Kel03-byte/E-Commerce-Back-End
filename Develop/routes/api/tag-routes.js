const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'Sorry, There is no Tag with that Id!' });
      return
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'Sorry, there is no Tag with that Id!' });
      return;
    }
    res.status(200).json({ message: `Tag Id #${req.params.id} has been updated` });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'Sorry, there is no Tag with that Id!' });
      return;
    }
    res.status(200).json({ message: `Tag Id #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
