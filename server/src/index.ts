import fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';

const server = fastify();
server.register(fastifyWebsocket);

server.register(async (fastify) => {
  fastify.get('/', { websocket: true }, (conn, req) => {
    conn.socket.on('message', msg => {
      conn.socket.send('hi wildcard');
      console.log(msg);
    });
  });
});

server.listen({ port: 8000 }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening @ ${addr}`);
});
