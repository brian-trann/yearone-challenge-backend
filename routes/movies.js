const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const { validateQuery, validateInteraction } = require('../middleware/middleware');
const { BadRequestError } = require('../expressError');

router.get('/search', validateQuery, async (req, res, next) => {
	try {
		const { title } = req.query;
		const page = Number.isFinite(+req.query.page) ? req.query.page : 1;
		if (!title) throw new BadRequestError();

		const response = await Movie.getMoviesByTitle(title, page);
		const { movies, totalPages } = response;
		return res.json({ movies, totalPages });
	} catch (error) {
		return next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) throw new BadRequestError();
		const movie = await Movie.getMovieById(id);
		return res.json({ movie });
	} catch (error) {
		return next(error);
	}
});
router.post('/:id', validateInteraction, async (req, res, next) => {
	try {
		const { id } = req.params;
		const { command } = req.query;

		const response = await Movie.movieInteraction({ id, command });
		return res.status(201).json({ response });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
