pragma solidity ^0.4.20;

contract Casino{

   //Variables 
   address public owner;
   uint256 public minBet;
   uint256 public numberOfBets;
   uint256 public totalBet;
   uint256 public maxAmountOfBets = 100;
   uint256 public lastWinner = -1;
   address[] public players;
	
   struct Player {
      uint256 amountBet;
      uint256 numberSelected;
   }

   //Like a dictionary with the address being the key and Player struct being the value
   mapping(address => Player) public playerInfo;

	constructor(uint256 _minBet) public{
		owner = msg.sender;
		if(_minBet != 0 ) minBet = _minBet;

	}

	function kill() public{
		if(msg.sender == owner) selfdestruct(owner);
	}

	 function checkPlayerExists(address player) public constant returns(bool){
      for(uint256 i = 0; i < players.length; i++){
         if(players[i] == player) return true;
      }
      return false;
   }


		function bet(uint256 numberSelected) public payable {
		require(checkPlayerExists(msg.sender)==false);
		require(numberSelected >= 1 && numberSelected <= 10);
		require(msg.value >= minBet);
		playerInfo[msg.sender].amountBet = msg.value;
		playerInfo[msg.sender].numberSelected = numberSelected;
		numberOfBets++;
		players.push(msg.sender);
		totalBet += msg.value;
		if(numberOfBets >= maxAmountOfBets) generateNumberWinner();
	}

	function generateNumberWinner() public {
      uint256 numberGenerated = uint256(block.blockhash(block.number-1))%10 + 1;
      distributePrizes(numberGenerated);
   }

   function distributePrizes(uint256 numberWinner) public{
   	address[100] memory winners;
   	uint256 count = 0;
    lastWinner = numberWinner;
   	for(uint256 i=0; i<players.length; i++){
   		address playerAddress = players[i];
   		if(playerInfo[playerAddress].numberSelected == numberWinner){
   			winners[count] = playerAddress;
   			count++;
   	}
   	delete playerInfo[playerAddress];
   }
   players.length = 0;

   uint256 winnerEtherAmount = totalBet / winners.length;
   for(uint256 j=0;j<count;j++){
   	 if(winners[j] != address(0))
   	 	winners[j].transfer(winnerEtherAmount);
   }
    
   }
}