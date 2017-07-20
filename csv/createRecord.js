const csv = require('csvtojson');
const jsonfile = require('jsonfile');

let records = [];
let now = new Date();
let result = {
  "info": "My Record",
  "update": now.toISOString().slice(0,10),
  "content" : [
    /*
    {
      "date": "2017-07-17",
      "counter": 4,
      "bottles": [
        { "cord": "111111111", "product": "팍세 스타우트"},
        { "cord": "222222222", "product": "파울라너" },
        { "cord": "333333333", "product": "기린 이치방시보리" },
        { "cord": "444444444", "product": "아하시 드라이 블랙" }
      ]
    },
    */
  ]
};

csv()
.fromFile('./csv/myRecord.csv')
.on('json', (row) => {

  let tempRecord = {
    date: row['date'],
    counter: 0,
    bottle: []
  };

  for (let prop in row) {
    if (prop != 'date' && row[prop]) {
      tempRecord.bottle.push({
        product: row[prop]
      })
    }
  }

  tempRecord.counter = tempRecord.bottle.length;

  records.push(tempRecord);
})
.on('done', () => {

  result.content = records;

  jsonfile.writeFile('./data/myRecord.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
