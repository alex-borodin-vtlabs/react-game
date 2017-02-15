const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000,
	routes: { cors: true },
});
server.scores = [];
server.setScore = (score) => {
	server.scores.push(score)
	server.sortScores()
	}


server.sortScores = () => {server.scores.sort((a, b) => {
		return a.score - b.score;
	});};

// Add the route
server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => reply('Nothing to see here'),
});

server.route({
	method: 'GET',
	path: '/results/',
	handler: (request, reply) => {
		server.sortScores();
		reply({scores:server.scores}).code(200);
	},
});

server.route({
	method: 'POST',
	path: '/results/',
	handler: (request, reply) => {
		server.setScore({name:request.query.name, score:request.query.score});
		reply({scores:server.scores}).code(201);
	},
});


// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});


module.exports.server = server;
