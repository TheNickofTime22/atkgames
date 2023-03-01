


var container;
var cursorXYText;

// object details
var boxCursor;

var boxcursorRect;
var containerRiseSpeed = 0.005;
var containerSpeed = 0.10;
var containerChildren;
var delay = 0;

var nameIncrement = 0;

var primaryBlock;
var secondaryBlock;


var primaryBlockName;
var primaryBlockIndex = [0, 3];

var secondaryBlockName;
var secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];


var blockColors = ["gold_block", "red_block", "blue_block", "green_block", "orange_block", "pink_block", "purple_block", "indigo_block"];


// Game rules
var numRows = 50;
var left, right, up, down, swap, devBtn1, devBtn2, remove;


// check match
var checkLength = 5;

var checkStart = 0;

// score

var game_time_display, time_display; // keeps track of game time
var timer_hours, timer_min, timer_seconds;

var game_score_display, score_display; // current score from matches

var game_mode_display; // current gamemode

var game_speed_display; // current game speed

var timer;
var thisScene;

class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: 'gameScene' });
		
		
	}

	init() {
		
		thisScene = this.scene;
		containerRiseSpeed = 0.005;
		nameIncrement = 0;
		primaryBlockIndex = [0,3];
		secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];
		numRows = 50;
		containerChildren = [];


		//
		checkLength = 5;

		checkStart = 0;
		//

		//MODE
		
		//


		timer_hours = 0;
		timer_min = 0;
		timer_seconds = 0;
		game_score_display = 0, score_display; // current score from matches
		game_mode_display = "Endless"; // current gamemode
		game_speed_display = 1.00.toFixed(2); // current game speed

		
	};

	preload() {
		this.load.image('cursor', '/resources/img/cursor.png');
		this.load.image('white_background', '/resources/img/white_background.png');
		this.load.image('gold_block', '/resources/img/gold_block_lg.png');
		this.load.image('red_block', '/resources/img/red_block_lg.png');
		this.load.image('blue_block', '/resources/img/blue_block_lg.png');
		this.load.image('indigo_block', '/resources/img/indigo_block_lg.png');
		this.load.image('purple_block', '/resources/img/purple_block_lg.png');
		this.load.image('pink_block', '/resources/img/pink_block_lg.png');
		this.load.image('green_block', '/resources/img/green_block_lg.png');
		this.load.image('orange_block', '/resources/img/orange_block_lg.png');
		this.load.image('testPlus', '/resources/img/testPlus.png');
		this.load.image('blueBorder', '/resources/img/blueborder.png');
		this.load.image('black_block', '/resources/img/black_block_lg.png');
		this.load.image('null_block', '/resources/img/null_block_lg.png');
		this.load.image('score_board', '/resources/img/scoreborder.png');

		this.load.atlas('atlas', '/resources/img/block_atlas/base_blocks.png', '/resources/img/block_atlas/base_blocks.json');
	}



	create() {

		
		
		containerChildren = [];
		if (timer == true){
			console.log('Timer Mode');
			console.log(timer);
		} else {
			console.log('Endless Mode');
			console.log(timer);
		}

		// add background and border
		var bg = this.add.image(0, 0, 'white_background');
		bg.setOrigin(0, 0);
		bg.displayWidth = this.sys.canvas.width;
		bg.displayHeight = this.sys.canvas.height;
		// -------------------------
		
		
		// TESTING SQUARE 
		//var testPlus = this.add.image(0.5, 0.5, "testPlus").setScale(4);
		// ---------------

		// Add container, position origin at cent of screen offset -210
		container = this.add.container((screen.width/2) -210, screen.height/2 + 215);
		//container.add(testPlus);
		
		// ------------------------------------------------------------

		// Make the grid of blocks based off of the numRows variable. Add to container
		this.makeGrid(numRows).forEach(element => {
			for (let index = 0; index < element.length; index++) {
				containerChildren.push(element[index])
			}
		});
		// ----------------------------------------------------------------------------

		container.add(containerChildren);


		// Add blue bordered game boundry
		var grid_box = this.add.container(screen.width / 2, (screen.height / 2))
		
		grid_box.add([this.add.image(0, 10, "blueBorder")]);	

		this.add.text(710, -20, "__________________________________", {font: '92px Bernard', fill: '#000000'});
		


		
		// --------------------------------

		// scoreboard 


		var score_box = this.add.container(screen.width/ 1.31, (screen.height / 2.55));

		score_box.add([this.add.image(0, 0, "score_board")]);

		


		score_box.add(this.add.text(-30, -300, 'Time', {font: '32px Bernard', fill: '#000000'}));
		score_box.add(time_display = this.add.text(-40, -250, ':: '+ game_time_display +' ::', {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-230, -230, "_____________________________", {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-30, -150, 'Score', {font: '32px Bernard', fill: '#000000'}));
		score_box.add(score_display = this.add.text(-55, -100, '||     '+ game_score_display +'     ||', {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-230, -70, "_____________________________", {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-30, 0, 'Mode', {font: '32px Bernard', fill: '#000000'}));
		score_box.add(this.add.text(-70, 50, ':: '+ game_mode_display +' ::', {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-230, 80, "_____________________________", {font: '32px Bernard', fill: '#000000'}));

		score_box.add(this.add.text(-30, 150, 'Speed', {font: '32px Bernard', fill: '#000000'}));
		score_box.add(this.add.text(-60, 200, '<< '+ game_speed_display +' >>', {font: '32px Bernard', fill: '#000000'}));




		//this.add.text(500, 400, 'testing', {font: '32px Bernard', fill: '#000000'});


		
		// --------------------------------

		// Make debug text in top left
		
		// --------------------------
		

		// Create keybindings 
		left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		remove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		devBtn1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		devBtn2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		swap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// ------------------------------

		// Create Cursor
		boxCursor = this.add.sprite(0, 0, 'cursor');
		boxCursor.setName('BoxCursor');
		container.add(boxCursor);
    	boxCursor.setPosition(210, 0);
		boxCursor.setScale(1.1);
		//------------------------------
		
		// Create array of all current blocks for testing
		
		
		//---------------------------------------------
		
		

		// container.children.iterate(function(element){
		// 	element.setInteractive();
		// })

		container.getAll().forEach(element => {
			element.setInteractive();
		});
		
		
			
		
	}

	update(time) {
		// update text 
		timer_seconds += 0.01

		if (timer_seconds.toFixed(0) == 20){
			
		}


		if (timer_seconds.toFixed(0) == 60){
			timer_seconds = 0;
			timer_min += 1;
			if (timer_min.toFixed(0) == 60){
				timer_seconds = 0;
				timer_min = 0;
				timer_hours += 1;
			}
		}
		time_display.setText(timer_hours+":0"+timer_min+":"+timer_seconds.toFixed(0));
		
		


		// ------------


		boxcursorRect = boxCursor.getBounds();
		// check for match
		// remove
		// raise
		cursorXYText = container.getByName('BoxCursor') + ": x:" + boxcursorRect.x + "| y: " + boxcursorRect.y;

		// HOVERED BLOCK INFORMATION _____________________________________________________
		primaryBlockName = "Block" + primaryBlockIndex[0] + "-" + primaryBlockIndex[1];
		secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];
		primaryBlock = container.getByName(primaryBlockName);

		secondaryBlockName = "Block" + secondaryBlockIndex[0] + "-" + secondaryBlockIndex[1];
		secondaryBlock = container.getByName(secondaryBlockName);
		

		// _______________________________________________________________________________


		// Update and listen for directional cursor movement
		if (Phaser.Input.Keyboard.JustDown(left) && boxcursorRect.x > 726) {
			boxCursor.x -= 60;
			this.shiftFocus('left');
			console.log("input--l");

		} else if (Phaser.Input.Keyboard.JustDown(right) && boxcursorRect.x < 1080) {
			boxCursor.x += 60;
			this.shiftFocus('right');
			console.log("input--r");
		}
	
		if (Phaser.Input.Keyboard.JustDown(up) && boxcursorRect.y > 65) {
			boxCursor.y -= 60;
			this.shiftFocus('up');
			console.log("input--u");

		} else if (Phaser.Input.Keyboard.JustDown(down) && boxcursorRect.y < 842) {
			boxCursor.y += 60;
			this.shiftFocus('down');
			console.log("input--d");
		}


		if (boxcursorRect.y < 65){
			boxCursor.y += 60;
		}

		

		
		//------------------------------------------------------------

/*
  ______  __    __   _______   ______  __  ___                              
 /      ||  |  |  | |   ____| /      ||  |/  /                              
|  ,----'|  |__|  | |  |__   |  ,----'|  '  /                               
|  |     |   __   | |   __|  |  |     |    <                                
|  `----.|  |  |  | |  |____ |  `----.|  .  \                               
 \______||__|  |__| |_______| \______||__|\__\                              

.___  ___.      ___   .___________.  ______  __    __   _______     _______.
|   \/   |     /   \  |           | /      ||  |  |  | |   ____|   /       |
|  \  /  |    /  ^  \ `---|  |----`|  ,----'|  |__|  | |  |__     |   (----`
|  |\/|  |   /  /_\  \    |  |     |  |     |   __   | |   __|     \   \    
|  |  |  |  /  _____  \   |  |     |  `----.|  |  |  | |  |____.----)   |   
|__|  |__| /__/     \__\  |__|      \______||__|  |__| |_______|_______/    


*/
		// container.iterate(checkVertMatch());


		// Increment focused box


		if (Phaser.Input.Keyboard.JustDown(swap)) {
			// container.remove(primaryBlock);
			if (primaryBlock != null || secondaryBlock != null){
				this.swapColors(primaryBlock, secondaryBlock)
			}
			
		}

		// ________    SWAP BLOCKS _________

		if (Phaser.Input.Keyboard.JustDown(remove)){
			primaryBlock.setTexture('null_block');
			primaryBlock.setData('color', 'null_block');

			secondaryBlock.setTexture('null_block');
			secondaryBlock.setData('color', 'null_block');
			
		}

		
		// SPEED CONTROL
		containerRiseSpeed += containerSpeed;
		
		container.y = ((screen.height/2) - containerRiseSpeed);
		
		if (container.y <= 100){
			// container.each(function(item){
			let over = container.each(function(item){
				if (item.getBounds().y < 70 && item.getData('color') != 'null_block'){
					thisScene.start('gameoverScene');
				}
				
			});

			
		}
		// ----------------------------------------------------------------------------------------------------

		if (delay == 100){
			this.bubbleUpNull();
			//this.eliminateRow();
			
			delay = 0;
		} else if (delay == 50) {
			this.matchOf3Vert();
			this.matchOf3Hori();
			score_display.setText(game_score_display);
			delay += 1;
		} else {
			delay += 1;
		}
		// ---------------


		
		
		// Update Debug information
		
		
		

		//---------------------------------------------

	}

	end() {

	}

	bubbleUpNull(){
		
		for (let row = 0; row < 13; row++) {
			for (let column = 0; column < 8; column++) {
				
				let top = (8*row) + column
				let bot = (8 * (row+1)) + column
		
				let block1 = container.getAt(top);
				let block2 = container.getAt(bot);

				if (block2.getData('color') == 'null_block' && block1.getData('color') != 'null_block'){
					
					this.swapColors(block1, block2);
				}
			}
		}
	}

	matchOf3Vert(){
		
		for (let row = checkStart; row < checkLength; row++) {
			for (let column = 0; column < 8; column++) {
				
				let top = (8*row) + column
				let mid = (8 * (row+1)) + column
				let bot = (8 * (row+2)) + column 
		
				let block1 = container.getAt(top);
				let block2 = container.getAt(mid);
				let block3 = container.getAt(bot);

				let color = block1.getData('color');

				if ((block1 != null && block2 != null && block3 != null) && (block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color) && color != 'null_block'){
					block1.setData('color', 'null_block');
					block2.setData('color', 'null_block');
					block3.setData('color', 'null_block');

					block1.setTexture('null_block');
					block2.setTexture('null_block');
					block3.setTexture('null_block');
					// reward points.
					game_score_display += 150;
					checkLength += 1;
				}
			}
		}
	}

	matchOf3Hori(){

		for (let row = 0; row < 13; row++) {
			for (let column = 0; column < 6; column++) {
				
				let start = (8*row) + column
				let mid = (8*row) + column + 1
				let end = (8*row) + column + 2
		
				let block1 = container.getAt(start);
				let block2 = container.getAt(mid);
				let block3 = container.getAt(end);

				let color = block1.getData('color');

				if ((block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color) && color != 'null_block'){
					block1.setData('color', 'null_block');
					block2.setData('color', 'null_block');
					block3.setData('color', 'null_block');

					block1.setTexture('null_block');
					block2.setTexture('null_block');
					block3.setTexture('null_block');
					// reward points.
					game_score_display += 150;
				}
			}
		}
	}

	eliminateRow(){
		if (this.checkFirstRowEliminated()){
			let nulls = [];
			for (let index = 0; index < 8; index++) {
				
				nulls.push(container.getAt(index));
			}
				nulls.forEach(element => {
					element.setTexture('null_block');
				});
			}
	}
		
		
	checkFirstRowEliminated(){

		
		let nulls = [];
		for (let index = 0; index < 8; index++) {
				
			if (container.getAt(index).getData('color') == 'null_block'){
				nulls.push(container.getAt(index));
			}
		}
		if (nulls.length == 8){
			return true;
		} else {
			return false;
		}
		
	}

		


	swapColors(block1, block2){
		let primaryColor = block1.getData('color');
		let secondaryColor = block2.getData('color');
			if (primaryColor !== secondaryColor || (primaryBlock != null || secondaryBlock != null)){
				block1.setTexture(secondaryColor)
				block2.setTexture(primaryColor)

				block1.setData('color', secondaryColor);
				block2.setData('color', primaryColor);
			}
	}


	shiftFocus(direction){
		switch (direction) {
			case 'left':
				primaryBlockIndex[1] -= 1;
				break;
			case 'right':
				primaryBlockIndex[1] += 1;
				break;
			case 'up':
				primaryBlockIndex[0] -= 1;
				break;
			case 'down':
				primaryBlockIndex[0] += 1;
				break;
		}
	}

	incrementIndex(){
		
		if (primaryBlockIndex[1] != 7){
			primaryBlockIndex[1] += 1;
		} else {
			primaryBlockIndex[1] = 0;
			primaryBlockIndex[0] += 1;
		}
	}

	decrementIndex(){

		if (primaryBlockIndex[1] != 0){
			primaryBlockIndex[1] -= 1;
		} else {
			primaryBlockIndex[1] = 7;
			primaryBlockIndex[0] -= 1;
		}
	}

	shuffle(array) {
		let currentIndex = array.length, randomIndex;
	
		// While there remain elements to shuffle.
		while (currentIndex != 0) {
	
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
	
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}
	
		return array;
	}
	
	makeRow(increment) {
		const results = [];
		
		
		let masterSprite = this.add.sprite(0,0,"testPlus");
		blockColors = this.shuffle(blockColors);
		
		for (let index = 0; index < 8; index++) {
			masterSprite = this.add.sprite((index*60), (0+increment), blockColors[index]);
			masterSprite.setName('Block'+(nameIncrement)+"-"+index);
			masterSprite.setData({color: blockColors[index], x: nameIncrement, y: index })
			results.push(masterSprite);
			
		}
		nameIncrement+=1;
		return results;
	}

	/*
	makeRow(increment) {
		const results = [];
		
		let blocks = ["gold_block", "red_block", "blue_block", "green_block", "orange_block", "pink_block", "purple_block", "black_block"];
		let masterSprite = this.add.sprite(0,0,"testPlus");
		
	
		blocks = this.shuffle(blocks);
		for (let index = 0; index < 8; index++) {
			masterSprite = this.add.sprite((index*60), (0+increment), blocks[index]);
			masterSprite.setName('Block'+(nameIncrement)+"-"+index);
			masterSprite.setData('color', blocks[index])
			results.push(masterSprite);
			
		}
		nameIncrement+=1;
		return results;
	}
	*/
	
	makeGrid(numRows) {
		const gridArray = [];
		
		for (let index = 0; index < (numRows * 60); index+=60) {
			gridArray.push(this.makeRow(index));
		}
		return gridArray;
	}

	addRow(){
		var row = this.makeRow((numRows * 60));
		container.add(row);
	}

	checkVertMatch(){
		let blockCheckList = [];
		container.getAll().forEach(block => {
			// get x position from name
			
			blockCheckList.push([block.getData('x'), block.getData('y'), block.getData('color')]);
		});

		console.log(blockCheckList);

		blockColors.forEach(element => {
			
		});
	}

}


export default GameScene;