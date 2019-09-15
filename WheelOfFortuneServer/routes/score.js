const db = require('../db/db');

function getScore(req, res) {
    //Сделать запрос в базу и, если неn ошибок, отдать score
    db.getScore( (score) => {
        console.log("Get score: ", score);

        res.json({score});
    });
}

module.exports = {getScore};