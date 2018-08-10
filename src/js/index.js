var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //For offline blockchain
    web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:7545"));
}
console.log(web3.currentProvider);
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log('hello');

console.log(web3.eth.defaultAccount)
//ABI goes here
var LotContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"numberSelected","type":"uint256"}],"name":"bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"numberWinner","type":"uint256"}],"name":"distributePrizes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"generateNumberWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_minimumBet","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"checkPlayerExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastWinner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxAmountOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"playerInfo","outputs":[{"name":"amountBet","type":"uint256"},{"name":"numberSelected","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);
//Contract address goes here
var lot = LotContract.at('0xb462545e52d670e4a69bb497bb6e2edcf1347f0e');

console.log(lot);

displayInfo();

var betVal = 1;

$('#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7,#btn8,#btn9,#btn10').click(function() {
    betVal = $('.bet-input').val();
    lot.bet(parseInt($(this).text()), {
        from: web3.eth.accounts[0],
        gas: 300000,
        value: web3.toWei(betVal, 'ether')
    }, function(error, transactionHash) {
        if (error) {
            console.log(error);
        }
    });
    displayInfo();

});


function displayInfo() {
    lot.totalBet.call(function(error, result) {
        $('#txt3').text(web3.fromWei(result, 'ether'));
    });

    lot.numberOfBets.call(function(error, result) {
        $('#txt1').text(result);
    });

     lot.minimumBet.call(function(error, result) {
        $('#txt4').text(result);
    });

     lot.maxAmountOfBets.call(function(error, result) {
        $('#txt5').text(result);
    });
}
