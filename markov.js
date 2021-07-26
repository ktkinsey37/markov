/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */


  makeChains(words) {
    // Init the output chain
    let chain = {};

    // Init a loop the length of the words array
    for (let i=0;i<words.length;i++){

        // If the chain object has this word as a key
        if (words[i] in chain){

          // Check if it's the last word in the words array, and if so
          if (words[i+1] == undefined){
            // chain[words[i]].push(null)
            break;
          }

          // For the chain[word] key, add the value of the next word in the words array, as a string
          chain[words[i]].push(`${words[i+1]}`)


        } else {

          // Else, init this word as a key in the chain, with the property of an empty array, and load the next word in the array
          chain[words[i]] = [words[i+1]]
        }
      }

      // return the chain object
      return chain
    }

  /** return random text from chains */

  pickRandomKeyInChain(obj) {
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)]
    return randomKey
  };

  makeText(numWords = 100) {
    // Create output array
    let outputText = []

    // Init loop for length of output
    for (let i=0;i<numWords+1;i++){

      // Every loop, get a random value from this.chain
      let randomKeyInChain = this.pickRandomKeyInChain(this.chain)

      // If outputText is empty, initialize it
      if (outputText.length == 0){
        outputText.push(randomKeyInChain)
        continue
      }

      // Assign the array for the previous word in outputText
      let keyArrayForPreviousWord = this.chain[outputText[i-1]]

      // Check if outputText's previous value has key-values in the this.chain object
      if (keyArrayForPreviousWord.length > 0){

        // If so, randomly append one of those values into the output text
        outputText.push(keyArrayForPreviousWord[Math.floor(Math.random()*keyArrayForPreviousWord.length)])
      }
      
    }
    outputText = outputText.join(" ") 
    return outputText
  }

}
