"use strict"
var assert = require("assert");

const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  connectionString: 'postgresql://coder:coder123@localhost:5432/greetings'
});
const Greeting = require('../greet');
describe('The greeting function', function () {
  beforeEach(async function () {
    await pool.query("DELETE FROM users");
  });
  it('should display "Molo, Xola" has a greet message if user entered Xola has a name and click on the radio button IsiXhosa ', async function () {
    var greeting = Greeting(pool);
    assert.equal(await greeting.messageGreet("Xola", "IsiXhosa"), "Molo, Xola");
  });
  it('should display "Hello, Andre" has a greet message if user entered Xola has a name and click on the radio button English', async function () {
    var greeting = Greeting(pool);
    assert.equal(await greeting.messageGreet("Andre", "English"), "Hello, Andre");
  });
  it('should display "Hallo, Greg" has a greet message if user entered Xola has a name and click on the radio button Afrikaans ', async function () {
    var greeting = Greeting(pool);
    assert.equal(await greeting.messageGreet("Xola", "Afrikaans"), "Hallo, Xola");
  });
  it('should display  "2" has a number of counter if user greeted twice with different names ', async function () {
    var greeting = Greeting(pool);
    await greeting.messageGreet("Greg", "IsiXhosa");
    await greeting.messageGreet("Aya", "IsiXhosa");
    assert.equal(await greeting.greetCounter(), 2);
  });
  it('should display "1" has a number of counter if user entered same name twice  ', async function () {
    var greeting = Greeting(pool);
    await greeting.messageGreet("Aya", "IsiXhosa");
    await greeting.messageGreet("Aya", "IsiXhosa");
    assert.equal(await greeting.greetCounter(), 1);
  });

});

describe("How many times user greeted", function () {
  beforeEach(async function () {
    await pool.query("DELETE FROM users");
  });
  it("should display a message (Hello Aya has been greeted 1 times if user search Aya", async function () {
    let greeting = Greeting(pool);

    await greeting.messageGreet("Aya", "IsiXhosa");
    assert.equal(await greeting.greetMessage("Aya"), "Hello, Aya has been greeted 1 time(s)");
  });

  it("should display a message (Hello Luvuyo has been greeted 2 times if user search Luvuyo", async function () {
    let greeting = Greeting(pool);
    
    await greeting.messageGreet("Greg", "English");
    await greeting.messageGreet("Aviwe", "Afrikaans");
    await greeting.messageGreet("Luvuyo", "Afrikaans");
    await greeting.messageGreet("Luvuyo", "IsiXhosa");

    let message = await greeting.greetMessage("Luvuyo");
    assert.equal("Hello, Luvuyo has been greeted 2 time(s)", message);

  });

});

  describe("Greeted Names",function(){
    beforeEach( async function(){
      await pool.query("DELETE FROM users");
        });

  it("Should show All greeted people", async function(){
    var greeting = Greeting(pool);
   await  greeting.messageGreet("Luvuyo","IsiXhosa");
   await  greeting.messageGreet("Greg","English");
  await  greeting.messageGreet("Aviwe","Afrikaans");

    assert.deepEqual( await greeting.nameMap(),[ 
    { first_name: 'Luvuyo' },
    { first_name: 'Greg' },
    { first_name: 'Aviwe' } ]
  );
  });
  after(async function(){
      await pool.end();
    });
  });