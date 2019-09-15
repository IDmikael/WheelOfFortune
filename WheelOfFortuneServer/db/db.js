const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to db');

    var segmentsTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS 
    segments (
     seg_id INTEGER PRIMARY KEY AUTOINCREMENT,
     seg_value INTEGER NOT NULL UNIQUE
    );`;

    var scoreTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS
    score (
     sc_id INTEGER PRIMARY KEY AUTOINCREMENT,
     sc_value INTEGER NOT NULL UNIQUE
    );`;

    db.run(segmentsTableCreateQuery, [], (err) => {
            if (err) {
                return console.error(err.message);
            }
        });

    db.run(scoreTableCreateQuery, [], (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            this.setScore(0);
        }
    });
});

exports.setSegments = function (segmentsArray) {

    var tmp = segmentsArray.map(function(segment){
        return '(?)';
    }).join(',');

    var sql = 'INSERT or REPLACE INTO segments(seg_value) VALUES ' + tmp;

    var shuffledSegmentsArr = shuffle(segmentsArray);

    db.run(sql, shuffledSegmentsArr, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("Segments added: ", segmentsArray);
        }
    });
}

exports.getSegments = function (callback) {

    var sql = 'SELECT seg_value FROM segments;';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        var responce = [];
        rows.forEach((row) => responce.push(row.seg_value));
        if(responce.length === rows.length){
            callback(responce);
        }
    });
}

exports.setScore = function (score) {
    db.run(`INSERT INTO score(sc_value) VALUES(?)`, [score], (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
}

exports.updateScore = function (score) {
    let sql = `UPDATE score
        SET sc_value = ?
        WHERE sc_id = ?`;

    db.all('SELECT sc_value FROM score WHERE sc_id = ?;', [1], (err, res) => {
        db.run(sql, [res[0].sc_value + score, 1], function (err) {
            if (err) {
                return console.error(err.message);
            }
        });
    });
}

exports.getScore = function (callback) {
    db.all('SELECT sc_value FROM score WHERE sc_id = ?;', [1], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        callback(row[0].sc_value);
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}