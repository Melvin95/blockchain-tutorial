const sha256 = require('sha256');

class Blockhain {

    constructor() {
        this.chain = [];
        this.pendingTransactions = []; 
        this.createNewBlock(2190214,'0','0');
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length +1, //where this block exists on the chain
            timestamp: Date.now(), //time block was added to the chain
            transactions: this.pendingTransactions, //new block should contain list of pending transactions
            nonce: nonce, //like an OTP, a number from proof of work (that block was created legitimately)
            hash: hash, //data (all transactions hashed) from this block
            previousBlockHash: previousBlockHash 
        };

        this.pendingTransactions = []; //clear list of transactions
        this.chain.push(newBlock); //adds block to chain

        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    /**
     * Adds new transaction to chain and returns the index of the block
     * that the transaction will reside on
     */
    createNewTransaction(amount, sender, receiver) {
        const newTransaction = {
            amount: amount,
            sender: sender, 
            receiver: receiver
        };

        this.pendingTransactions.push(newTransaction);

        return this.chain.length; //will reside on the next block created/mined.
    }

    hashBlock(previousBlockHash, currentBlockData, nonce) {
        return sha256(previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData));
    }

    /**
     * Proof of work for adding a block to a blockchain (generates a hash for this block)
     * @param {hash of previous block in chain} previousBlockHash 
     * @param {data of this new block} currentBlockData 
     * @returns nonce (unique number that can be used to regenerate the hash)
     */
    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

        while(hash.substring(0,4)!='0000'){
            nonce++;
            hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        }

        return nonce;
    }
}

module.exports = Blockhain;

