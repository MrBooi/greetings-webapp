"use strict"
var assert = require("assert");
const Greeting = require('../greet');
describe('The greeting function', function() {
    it('should display "Molo, Xola" has a greet message if user entered Xola has a name and click on the radio button IsiXhosa ', function() {
      var greeting = Greeting();
      assert.equal(  greeting.messageGreet("Xola","IsiXhosa"), "Molo, Xola");
    });
    it('should display "Hello, Andre" has a greet message if user entered Xola has a name and click on the radio button English', function() {
      var greeting = Greeting();
      assert.equal(  greeting.messageGreet("Andre","English"), "Hello, Andre");
    });
    it('should display "Hallo, Greg" has a greet message if user entered Xola has a name and click on the radio button Afrikaans ', function() {
      var greeting = Greeting();
      assert.equal( greeting.messageGreet("Xola","Afrikaans"), "Hallo, Xola");
    });
    it('should display  "2" has a number of counter if user greeted twice with different names ', function() {
      var greeting = Greeting();
      greeting.messageGreet("Greg","IsiXhosa");
      greeting.messageGreet("Aya","IsiXhosa");
      assert.equal(greeting.greetCounter(), 2);
    });
    it('should display "1" has a number of counter if user entered same name twice  ', function() {
      var greeting = Greeting();
      greeting.messageGreet("Aya","IsiXhosa");
      greeting.messageGreet("Aya","IsiXhosa");
      assert.equal(greeting.greetCounter(), 1);
    });
  });

  describe("How many times user greeted",function(){
    it("should display a message (Hello Aya has been greeted 2 times if user search Aya",function(){
      var greeting = Greeting();
      greeting.messageGreet("Aya","IsiXhosa");
      greeting.messageGreet("Aya","IsiXhosa");
      assert.equal(greeting.greetMessage("Aya"),"Hello, Aya has been greeted 2 time(s)");
    });

    it("should display a message (Hello Aya has been greeted 2 times if user search Aya",function(){
      var greeting = Greeting();
      greeting.messageGreet("Luvuyo","IsiXhosa");
      greeting.messageGreet("Greg","English");
      greeting.messageGreet("Aviwe","Afrikaans");
      assert.equal(greeting.greetMessage("Luvuyo"),"Hello, Luvuyo has been greeted 1 time(s)");
    });
  });

  describe("Greeted Names",function(){
  it("Should show All greeted people",function(){
    var greeting = Greeting();
    greeting.messageGreet("Luvuyo","IsiXhosa");
    greeting.messageGreet("Greg","English");
    greeting.messageGreet("Aviwe","Afrikaans");
    assert.deepEqual(greeting.nameMap(),{ Luvuyo: 1, Greg: 1, Aviwe:1 });
  });
  });