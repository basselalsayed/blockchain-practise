const crypto = require('crypto-js');

class Block {
  static stringify = item => item + '';

  static get timestamp() {
    return new Date().toISOString();
  }

  constructor(prevhash = '') {
    this.prevhash = prevhash;
    this.nonce = 0;
    this.hash = this.getNonce();
  }

  hashify = () =>
    Block.stringify(
      crypto.SHA256(
        Block.timestamp + this.prevhash + Block.stringify(this.nonce),
      ),
    );

  getNonce = () => {
    while (this.hashify().slice(0, 4) !== '0000') {
      this.nonce++;
    }
    return this.hashify();
  };
}

const a = new Block();
const b = new Block(a.hash);
const c = new Block(b.hash);

console.log('a', a);
console.log('b', b);
console.log('c', c);
