var path = require("path");
var fs = require("fs");

var SRC_FILE = path.resolve(path.join(__dirname, 'tsd-footer.d.ts'));
var DST_FILE = process.argv[2];
if (!DST_FILE) throw Error("Missing destination file: node tsd-footer.js <dst-file>");

fs.readFile(SRC_FILE, { encoding: 'utf8' }, function (err, data) {
    if (err) throw err;

    fs.appendFile(DST_FILE, data, { encoding: 'utf8' }, function (err) {
        if (err) throw err;
    });
});
