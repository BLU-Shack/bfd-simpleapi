/* eslint-disable */

const API = require('../src/run.js');
const Options = { token: 'none', botID: 'none', client: 'none', log: false};
const Client = new API(Options);

/*
    To use the test functions,
    change the doSomething()
    function to something.

    If you want to log fetch things,
    update the Options.log value to
    true.
*/
Client.doSomething();