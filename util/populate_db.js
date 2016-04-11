var fs = require('fs');
var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';

// takes a directory and outputs a list of files
exports.getFiles = function(dir, fileList){
    fileList = fileList || [];
 
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, fileList);
        } else {
            //name = name.split('.').join("");
            fileList.push(name);
        }
    }
    return fileList;
};

// takes a list of files and populates the database
exports.populateDB = function(fileList){
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    for(var i in fileList){
      console.log(fileList[i]);
      //client.query("INSERT INTO elements(source) values($1)", [fileList[i]]);
    }
    done();
  });
};




