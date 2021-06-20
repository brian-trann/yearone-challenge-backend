const axios = require('axios');
const db = require('../db');
const { API_KEY, API_URL } = require('../config');
const { getTotalPagesFromResults } = require('../helpers');
class Movie {
	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${API_URL}/?apiKey=${API_KEY}`;
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (error) {
			console.error('API Error: ', error.response);
			const message = error.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}
	static async getMoviesByTitle(title, page) {
		const data = { s: title, type: 'movie', page };
		const response = await this.request('', data);
		if (response['Error']) {
			response['Search'] = [];
		}
		const totalPages = getTotalPagesFromResults(response.totalResults);
		return { movies: response['Search'], totalPages };
	}

	static async getMovieById(id) {
		const data = { i: id };
		const response = await this.request('', data);
		const dbResponse = await db.query('SELECT likes, dislikes FROM movies WHERE id = $1', [
			id
		]);
		const dbMovie = dbResponse.rows[0];
		if (dbMovie) {
			response['likes'] = dbMovie.likes;
			response['dislikes'] = dbMovie.dislikes;
		}

		return response;
	}
	static async movieInteraction({ id, command = '' }) {
		const formattedCommand = command.toLowerCase();

		const res = await db.query('SELECT id FROM movies WHERE id = $1', [ id ]);
		const movie = res.rows[0];

		if (!movie) {
			await db.query('INSERT INTO movies (id) VALUES ($1) RETURNING id', [ id ]);
		}

		const updateQuery = [ 'UPDATE movies' ];

		if (formattedCommand === 'like') {
			updateQuery.push('SET likes = likes + 1');
		}
		if (formattedCommand === 'dislike') {
			updateQuery.push('SET dislikes = dislikes + 1');
		}

		updateQuery.push('WHERE id = $1 RETURNING likes, dislikes');

		const updateRes = await db.query(updateQuery.join(' '), [ id ]);
		const { likes, dislikes } = updateRes.rows[0];
		return { command, id, likes, dislikes };
	}
}
module.exports = Movie;
