import Coffee from '../models/Coffee.js';

async function getCoffees(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = { isActive: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const coffees = await Coffee.find(filter).sort({ createdAt: -1 });
    res.json(coffees);
  } catch (error) {
    next(error);
  }
}

async function getCoffeeById(req, res, next) {
  try {
    const coffee = await Coffee.findById(req.params.id);
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }
    res.json(coffee);
  } catch (error) {
    next(error);
  }
}

async function createCoffee(req, res, next) {
  try {
    const coffee = await Coffee.create(req.body);
    res.status(201).json(coffee);
  } catch (error) {
    next(error);
  }
}

async function updateCoffee(req, res, next) {
  try {
    const coffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }
    res.json(coffee);
  } catch (error) {
    next(error);
  }
}

async function deleteCoffee(req, res, next) {
  try {
    const coffee = await Coffee.findByIdAndDelete(req.params.id);
    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' });
    }
    res.json({ message: 'Coffee deleted' });
  } catch (error) {
    next(error);
  }
}

export { getCoffees, getCoffeeById, createCoffee, updateCoffee, deleteCoffee };
