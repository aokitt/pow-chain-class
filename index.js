const jayson = require('jayson');
const {startMining,stopMining} = require('./mine');
const {PORT} = require('./config');
const {utxos} = require('./db');

// create a server
const server = jayson.server({
 startMining: function(_, callback) {
    callback(null, 'Success!');
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'Success!');
    stopMining();
 },
  getBalance: function(address, callback) {
    const ourUTXOs = utxos.filter(x => {
      console.log(utxos.length.map(x => x.owner), address);
      return x.owner === address && !x.spent;
    }); 
    const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
    callback(null, sum);
  } 
});

server.http().listen(PORT);




