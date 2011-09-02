var _ = require('underscore')._,
    LanguageDetect = require('languagedetect'),
    lngDetector = new LanguageDetect(),
    glossary = require("./glossary"),
    language = readAllStopwordFilesSync("./stopwords");
  
  
function extract(text, options){
  var textLang = lngDetector.detect(text,1);
  var terms = glossary.extract(text, options);

  if(_.contains(_.keys(language),textLang[0][0])){
   terms = _(terms).reject(function(term) {
      return _(language[textLang[0][0]]).any(function(stopword) {
         return term.toLowerCase() === stopword;
      }) 
   })
  }
  return {"terms": terms, "language": textLang[0][0]}
}

function readAllStopwordFilesSync(path){
    var languanges = {};
  files = fs.readdirSync(path);
  files.forEach(function (filename){
    var data = fs.readFileSync(path+"/"+filename).toString();
    languanges[filename.split("-")[0]] = data.split("\n");
  });
  
  return languanges;
}

function readAllStopwordFiles(path,callback){
  var languanges = {};
  var readCount = 0;
  
  fs.readdir(path, function(err, files){
    if (err) throw err;
    files.forEach(function (filename){
        fs.readFile(path+"/"+filename, function(err, data){
          if (err) throw err;
          languanges[filename.split("-")[0]] = data.toString().split("\n");
          readCount++;
          if(readCount === files.length)
            callback(languanges);
        });
    });
  })
}

//Exports
exports.extract = extract; 
