"Use strict"
module.exports = function (pool) {
  var namesGreeted = {};
  var name = "";
  var lang = "";

  async function greetPerson(value, langauge) {
    if (value == " " && langauge == "") {
      return;
    }
  
    let storedUser = await pool.query('SELECT * FROM users WHERE first_name = $1', [value]);
    if (storedUser.rowCount === 0) {
      await pool.query('INSERT into users (first_name,greet_counter ) values ($1,$2)', [value, 0]);
    }  
      await pool.query("UPDATE users SET greet_counter = (greet_counter+1) WHERE first_name= $1", [value]);
    
    if (langauge === "English") {
      return "Hello, " + value;
    } else if (langauge === "Afrikaans") {
      return "Hallo, " + value;
    }
   else if (langauge === "IsiXhosa") {
      return "Molo, " + value;
    }
  }

  function greetuser(){
    if (lang === "English") {
      return "Hello, " + name;
    } else if (lang === "Afrikaans") {
      return "Hallo, " + name;
    }
    if (lang === "IsiXhosa") {
      return "Molo, " + name;
    }
  }

  async function getNamesList() {
    let listOfNames = await pool.query("SELECT first_name FROM users ");
    return listOfNames.rows;
  }


  async function greetedNames() {
    let count = await pool.query("SELECT * from users");
    return count.rowCount;
  }

  async function restNamesList() {
    let clear = await pool.query('DELETE from users');
    return clear;
  }

  async function personGreet(value) {
    if (value != "") {
      let user = await pool.query('SELECT * FROM users WHERE first_name = $1', [value]);
      let greet_counter = 0;
      if (user.rows.length > 0){
        greet_counter = user.rows[0].greet_counter;
        let first_name = user.rows[0].first_name;
        let message = `Hello, ${first_name} has been greeted ${greet_counter} time(s)`;
        return message;
      }
      else {
        return "Name not found!";
      }   
    }
  }

  return {
    messageGreet: greetPerson,
    nameMap: getNamesList,
    greetuser,
    greetCounter: greetedNames,
    reset: restNamesList,
    greetMessage: personGreet
  }
}
