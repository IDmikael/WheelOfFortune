const db = require('../db/db');

function getSegments(req, res) {
    //Сделать запрос в базу и, если неn ошибок, отдать segments
    var segmentsArray = [];
    var coefficient = 1;

    segmentsArray.push(Math.round(Math.random() * (1000 - 10) + 10) * 100);

    if (segmentsArray[0] >= 50000){
        coefficient = -1;
    }

    while (segmentsArray.length != 16){
        var randomNumber = Math.round(Math.random() * (50 - 10) + 10);
        segmentsArray[segmentsArray.length] = segmentsArray[segmentsArray.length - 1] + (coefficient * randomNumber * 100);
    }

    db.setSegments(segmentsArray);

    res.status(200).json({segmentsArray});
}

module.exports = {getSegments};