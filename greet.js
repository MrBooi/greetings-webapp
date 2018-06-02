
module.exports=function() {
  var namesGreeted = {};
  var name = "";
  var lang = "";

  function greetPerson(value,langauge) {
    if (value !== " " && langauge!=="") {
      name = value;
      lang  =langauge;
      if (namesGreeted[name] === undefined) {
        namesGreeted[name] = 0;
      }
      namesGreeted[name] += 1;
    }
    
    if (lang === "English") {
      return "Hello, " + name;
    } else if (lang === "Afrikaans") {
      return "Hallo, " + name;
    }
    if (lang === "IsiXhosa") {
      return "Molo, " + name;
    }

    // return name;
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


 function  greetedNames(){
  return Object.keys(namesGreeted).length;
 }

 function restNamesList() {
  return namesGreeted = {};
}

 function personGreet(value){
   if(value!=""){
  let count=  namesGreeted[value];
  return "Hello, "+value+" has been greeted "+count + " time(s)";
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
