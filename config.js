require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'my-dev-server';
const API_URL = 'http://www.omdbapi.com';
const API_KEY = process.env.API_KEY;
const PORT = +process.env.PORT || 3001;

const getDatabaseUri = () => {
	return process.env.NODE_ENV === 'test'
		? 'yearone_takehome_test'
		: process.env.DATABASE_URL || 'yearone_takehome';
};
console.log('~~~~~~~~~~');
console.log('Year One - Config:');
console.log('SECRET_KEY:', SECRET_KEY);
console.log('PORT:', PORT);
console.log('Database:', getDatabaseUri());
console.log('~~~~~~~~~~');

module.exports = {
	SECRET_KEY,
	PORT,
	API_URL,
	API_KEY,
	getDatabaseUri
};
