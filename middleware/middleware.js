const { BadRequestError } = require('../expressError');
const { LIKE, DISLIKE, PAGE, TITLE } = require('../constants');
const validateQuery = (req, res, next) => {
	try {
		const values = Object.values(req.query);
		if (values.length === 0 || values.every((v) => !v)) {
			throw new BadRequestError();
		}

		if (!req.query.title) {
			throw new BadRequestError();
		}
		if (req.query.hasOwnProperty(PAGE)) {
			if (!Number.isFinite(+req.query.page)) {
				throw new BadRequestError();
			}
		}
		return next();
	} catch (error) {
		return next(error);
	}
};
const validateInteraction = (req, res, next) => {
	try {
		const { command } = req.query;
		if (!command) {
			throw new BadRequestError();
		}

		const lowerCommand = command.toLowerCase();
		if (lowerCommand !== LIKE && lowerCommand !== DISLIKE) {
			throw new BadRequestError();
		}
		return next();
	} catch (error) {
		return next(error);
	}
};
module.exports = { validateQuery, validateInteraction };
