const Blockhain = require('../dev/blockchain');
const expect = require('chai').expect;
const ethereum = new Blockhain();

describe('#testBlockchain', function() {

    it('should contain genesis block' ,function() {
        expect(ethereum.chain.length).equal(1);
    })

    it('should have one block in chain' ,function() {
        ethereum.createNewBlock(12345,'','JDIQOWIQOIWQO'); 
        expect(ethereum.chain.length).equal(2);
    })

    it('should have 1 pending transaction' ,function() {
        ethereum.createNewTransaction(100,'MELEWOFO2100','CHRISTYJ23NDEOIED');
        expect(ethereum.pendingTransactions.length).equal(1);
    })

    it('should add pending transaction to new block', function() {
        ethereum.createNewBlock(9999,'KAPDJWIJJ','JDFJEWIOIOE'); 
        expect(ethereum.pendingTransactions.length).equal(0);
        expect(ethereum.getLastBlock().nonce).equal(9999);
        expect(ethereum.getLastBlock().transactions[0].sender).equal('MELEWOFO2100');
        expect(ethereum.getLastBlock().transactions[0].amount).equal(100);
        expect(ethereum.getLastBlock().transactions[0].receiver).equal('CHRISTYJ23NDEOIED');
    })

    it('should reliably hash block data', function(){
        let previousBlockHash = ethereum.getLastBlock().previousBlockHash;
        let blockData = ethereum.getLastBlock().transactions;
        let nonce = ethereum.getLastBlock().nonce;
    
        let dummypreviousBlockHash = previousBlockHash;
        let dummyBlockData = blockData;
        let dummyNonce = nonce;

        let blockHash = ethereum.hashBlock(previousBlockHash, blockData, nonce);
        let dummyBlockHash = ethereum.hashBlock(dummypreviousBlockHash, dummyBlockData, dummyNonce);

        expect(blockHash).equal(dummyBlockHash);

        let fakeBlockHash = ethereum.hashBlock(dummypreviousBlockHash, dummyBlockData, dummyNonce+1);
        expect(blockHash).not.equal(fakeBlockHash);
    })

    it('should return the correct nonce for a specfic block (proof work)', function(){
        let previousBlockHash = ethereum.getLastBlock().previousBlockHash;
        const currentBlockData = [
            {
                amount: 101,
                sender: 'JDWIEDFNWEFNEIOOIEWO',
                recipient: 'ODOIDPOPOFOWEOFEO'
            },
            {
                amount: 121,
                sender: 'UDEOWFMEPFPMEPF',
                recipient: 'DJWENOFPWFNPENPF'
            }
        ];

        let nonce = ethereum.proofOfWork(previousBlockHash,currentBlockData);
        let hashBlock = ethereum.hashBlock(previousBlockHash,currentBlockData,nonce);

        expect(hashBlock.substring(0,4)).equal('0000');
    })

})


