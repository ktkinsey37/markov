/** Command-line tool to generate Markov text. */

const fs = require('fs');
const type = process.argv[2];
const path = process.argv[3];

const type = process.argv[2];
const path = process.argv[3];
const fs = require('fs');
const axios = require('axios');

function flagFinder(path){
    if (path == "--out"){
        const outputPath = process.argv[3]
        const path = process.argv[4]
        const output = decider(path)
        fs.writeFile(`${outputPath}`, String(output), 'utf8', err => {
            if (err) {
                console.log("ERROR", err)
                process.kill(1)
            }
        })
    }
}


function decider(path){
    if (path.search('http') == -1){
        const returnValue = cat(path)
        console.log("This is calling cat(path) directly into console log", cat(path))
        console.log(returnValue, "This is decider()")
        return(returnValue)
    } else {
        let returnValue = webCat(path)
        return(returnValue)
}
}


function cat(path){
    fs.readFile(`${path}`, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("This is cat(path)", data)
        return(data)             //For some reason this line isn't actually returning the data.
      })}

async function webCat(path){
    try{
        const res = await axios.get(`${path}`)
        return(res.data)
    }
    catch(err){
        console.log("ERROR", err)
    }
}

flagFinder(path)