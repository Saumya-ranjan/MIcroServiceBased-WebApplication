const net = require('net');

// Create a TCP server on localhost:2000
const server = net.createServer((socket) => {
  console.log('Client connected to server.');

  // Handle data received from the client
  socket.on('data', (data) => {
    console.log(`Received data from client: ${data.toString()}`);

    // Process the received data, if needed

    // Send response back to the client
    socket.write('Response from server');
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected from server.');
  });
});

server.listen(2000, 'localhost', () => {
  console.log('Server listening on localhost:2000');
});

// Create a TCP client to connect to localhost:3000
const client = new net.Socket();

client.connect(3000, 'localhost', () => {
  console.log('Connected to server at localhost:3000');

  // Send data to the server
  client.write('Hello from client');
});

// Handle data received from the server
client.on('data', (data) => {
  console.log(`Received data from server: ${data.toString()}`);

  // Process the received data, if needed

  // Close the connection after processing the response
  client.end();
});

// Handle server disconnection
client.on('end', () => {
  console.log('Disconnected from server at localhost:3000');
});

