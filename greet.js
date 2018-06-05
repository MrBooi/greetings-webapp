"Use strict"
module.exports=function(pool) {
  var namesGreeted = {};
  var name = "";
  var lang = "";
    
  async function greetPerson(value,langauge) {
    if (value !== " " && langauge!=="") {
       let result = pool.query('');
      name = value;
      lang  =langauge;
        let storedusers = await pool.query('SELECT * FROM users WHERE first_name = $1',[name]);
      if (storedusers.rowCount=== 0) {
        await pool.query('INSERT into users (first_name,greet_counter ) values ($1,$2)',[name,1]);
      }
      pool.query("UPDATE users SET greet_counter = (greet_counter +1) WHERE first_name= $1",[name]);
    }
    if (lang === "English") {
      return "Hello, " + name;
    } else if (lang === "Afrikaans") {
      return "Hallo, " + name;
    }
    if (lang === "IsiXhosa") {
      return "Molo, " + name;
    }
  }

  function setLang(value) {
    lang = value;
  }


  function getName() {
    return name;
  }

  function getLang() {
    return lang;
  }

  function getNamesList() {
    return namesGreeted;
  }


  async function  greetedNames(){
   let count =await pool.query("SELECT * from users");
   return count.rowCount;
 }

 async function restNamesList() {
  return namesGreeted = {};
}

  async function personGreet(value){
   if(value!=""){
  let count = await pool.query('SELECT * FROM users WHERE first_name = $1',[value]);
  return "Hello, "+value+" has been greeted "+count.rows[0].greet_counter + " time(s)";
   }
 }



  return {
    messageGreet: greetPerson,
    langauge: setLang,
    getName: getName,
    getLangaunge: getLang,
    // message: greet,
    nameMap: getNamesList,
    greetCounter:greetedNames,
    reset: restNamesList,
    greetMessage :personGreet
  }
}
