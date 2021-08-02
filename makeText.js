const fs = require('fs');
const markov = require('./markov')
const path = process.argv[3];
const method = process.argv[2];
const axios = require('axios');

function decider(method){
    if (method.search('url') == -1){
        const returnValue = cat(path)
        return(returnValue)
    } else {
        let returnValue = webCat(path)
        return(returnValue)
}
}

function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }

function cat(path){
    fs.readFile(path, 'utf8' , (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
          } else {
            makeText(data);
          }
        })};

async function webCat(path){
    try{
        const res = await axios.get(`${path}`)
        makeText(res.data)
    }
    catch(err){
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
}

decider(method);