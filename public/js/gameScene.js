import { BaseBlock } from './BaseBlock.js';



var block_container;
var main_container;
var debugText;
var cursorXYText;
var lineRow;

// object details
var boxCursor;
var main_container_blockLevel;

var boxcursorRect;
var block_containerRiseSpeed = 0.015;
var block_containerSpeed = 0.015;
var block_containerChildren;
var delay = 0;

var nameIncrement = 0;

var primaryBlock;
var secondaryBlock;
var FIRST_ROW_OF_NULLS;

var primaryBlockName;
var primaryBlockIndex = [0, 3];

var secondaryBlockName;
var secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];


var blockColors = ["gold_block", "red_block", "blue_block", "green_block", "orange_block", "pink_block", "purple_block", "indigo_block"];


// Game rules
var numRows = 6;
var left, right, up, down, swap, bugR, bugE, remove, speedUpBtn;


// check match
var checkLength = 10;

var checkStart = 0;

// score

var game_time_display, time_display; // keeps track of game time
var timer_hours, timer_min, timer_seconds;

var game_score_display, score_display, speed_display; // current score from matches

var game_mode_display; // current gamemode

var game_speed_display; // current game speed
var game_speed_text;
var game_speed = 1.00;

var timer;
var thisScene;

// class BaseBlock extends Sprite {
//     constructor(x, y, color) {
//       super(x, y);
//       this.color = color;
//     }
// }


class GameScene extends Phaser.Scene {



	constructor() {
		super({ key: 'gameScene' });


	}

	init(data) {

		thisScene = this.scene;
		block_containerRiseSpeed = 0.005;
		nameIncrement = 0;
		primaryBlockIndex = [0, 3];
		secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];




		numRows = 14;
		main_container_blockLevel = 3;




		block_containerChildren = [];
		debugText;

		game_speed_display;
		game_speed_text; // current game speed

		game_speed = 1.00;


		//
		checkLength = 5;
		checkStart = 0;
		//

		//MODE
		timer = data.timer;
		//
		FIRST_ROW_OF_NULLS = [];

		timer_hours = 0;
		timer_min = 0;
		timer_seconds = 0;
		game_score_display = 0, score_display; // current score from matches

		if (timer) {
			game_mode_display = "Time Trial"; // current gamemode
		} else {
			game_mode_display = "Endless"; // current gamemode
		}

		game_speed_display = "<< " + game_speed.toFixed(2) + " >>"; // current game speed
		block_container;
		main_container;
		lineRow = numRows;
	};

	preload() {
		this.load.image('cursor', '/img/cursor.png');
		this.load.image('white_background', '/img/white_background.png');
		this.load.image('gold_block', '/img/gold_block_lg.png');
		this.load.image('red_block', '/img/red_block_lg.png');
		this.load.image('blue_block', '/img/blue_block_lg.png');
		this.load.image('indigo_block', '/img/indigo_block_lg.png');
		this.load.image('purple_block', '/img/purple_block_lg.png');
		this.load.image('pink_block', '/img/pink_block_lg.png');
		this.load.image('green_block', '/img/green_block_lg.png');
		this.load.image('orange_block', '/img/orange_block_lg.png');
		this.load.image('testPlus', '/img/testPlus.png');
		this.load.image('blueBorder', '/img/blueborder.png');
		this.load.image('black_block', '/img/black_block_lg.png');
		this.load.image('null_block', '/img/testPlus.png');
		this.load.image('score_board', '/img/scoreborder.png');
		this.load.image('bomb_block', '/img/bomb_block_lg.png');

		this.load.atlas('atlas', '/img/block_atlas/base_blocks.png', '/img/block_atlas/base_blocks.json');
	}



	create() {



		block_containerChildren = [];
		if (timer == true) {
			//console.log('Timer Mode');
			//console.log(timer);
		} else {
			//console.log('Endless Mode');
			//console.log(timer);
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

		// Add block_container, position origin at cent of screen offset -210




		block_container = this.add.container((screen.width / 2) - 210, screen.height / 2 + 215);


		const block = new BaseBlock(this, 200, 200, 'red_block');
		block.shake();
		// ------------------------------------------------------------

		// Make the grid of blocks based off of the numRows variable. Add to block_container
		this.makeGrid(numRows).forEach(element => {
			for (let index = 0; index < element.length; index++) {
				block_containerChildren.push(element[index])
			}
		});


		// ----------------------------------------------------------------------------

		block_container.add(block_containerChildren);
		main_container = this.add.container(0, 0);
		main_container.add(block_container);

		// Add blue bordered game boundry
		var grid_box = this.add.container(screen.width / 2, (screen.height / 2))

		grid_box.add([this.add.image(0, 10, "blueBorder")]);

		this.add.text(710, -20, "_______________", { font: '92px Bernard', fill: '#000000' });




		// --------------------------------

		// scoreboard


		var score_box = this.add.container(screen.width / 1.31, (screen.height / 2.55));


		score_box.add([this.add.image(0, 0, "score_board")]);




		score_box.add(this.add.text(-30, -300, 'Time', { font: '32px Bernard', fill: '#000000' }));
		score_box.add(time_display = this.add.text(-40, -250, ':: ' + game_time_display + ' ::', { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-230, -230, "_____________________________", { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-30, -150, 'Score', { font: '32px Bernard', fill: '#000000' }));
		score_box.add(score_display = this.add.text(-55, -100, '||     ' + game_score_display + '     ||', { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-230, -70, "_____________________________", { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-30, 0, 'Mode', { font: '32px Bernard', fill: '#000000' }));
		score_box.add(this.add.text(-70, 50, ':: ' + game_mode_display + ' ::', { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-230, 80, "_____________________________", { font: '32px Bernard', fill: '#000000' }));

		score_box.add(this.add.text(-30, 150, 'Speed', { font: '32px Bernard', fill: '#000000' }));
		score_box.add(speed_display = this.add.text(-60, 200, game_speed_display, { font: '32px Bernard', fill: '#000000' }));




		debugText = this.add.text(0, 400, 'testing', { font: '32px Bernard', fill: '#000000' });



		// --------------------------------

		// Make debug text in top left

		// --------------------------


		// Create keybindings
		left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		remove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		bugE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		bugR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		swap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		speedUpBtn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
		// ------------------------------

		// Create Cursor
		boxCursor = this.add.sprite(0, 0, 'cursor');
		boxCursor.setName('BoxCursor');
		main_container.add(boxCursor);
		boxCursor.setPosition(960, 755);
		boxCursor.setScale(1.1);
		//------------------------------

		// Create array of all current blocks for testing


		//---------------------------------------------



		// block_container.children.iterate(function(element){
		// 	element.setInteractive();
		// })

		block_container.getAll().forEach(element => {
			element.setInteractive();
		});




	}

	update(time, delta) {
		// update text
		let deltaTime = (0.001 * delta);
		let fixedTime = deltaTime;
		timer_seconds += (fixedTime);




		if (timer_seconds.toFixed(2) == 60) {
			timer_seconds = 0;
			timer_min += 1;


			if (timer_min.toFixed(2) == 60) {
				timer_seconds = 0;
				timer_min = 0;
				timer_hours += 1;
			}
		} else if (timer_seconds.toFixed(2) % 5 == 0) {
			block_containerSpeed += 0.001;
			game_speed += 0.1
			speed_display.setText("<< " + game_speed + " >>");
		}
		time_display.setText(timer_hours + ":0" + timer_min + ":" + timer_seconds.toFixed(1));



		main_container_blockLevel
		this.adjustLevel();
		// ------------


		boxcursorRect = boxCursor.getBounds();
		// check for match
		// remove
		// raise
		cursorXYText = block_container.getByName('BoxCursor') + ": x:" + boxcursorRect.x + "| y: " + boxcursorRect.y;

		// HOVERED BLOCK INFORMATION _____________________________________________________
		primaryBlockName = "Block" + primaryBlockIndex[0] + "-" + primaryBlockIndex[1];
		secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];
		primaryBlock = block_container.getByName(primaryBlockName);

		secondaryBlockName = "Block" + secondaryBlockIndex[0] + "-" + secondaryBlockIndex[1];
		secondaryBlock = block_container.getByName(secondaryBlockName);


		// _______________________________________________________________________________


		// Update and listen for directional cursor movement
		if (Phaser.Input.Keyboard.JustDown(left) && boxcursorRect.x > 726) {
			boxCursor.x -= 60;
			this.shiftFocus('left');
			//console.log("input--l");

		} else if (Phaser.Input.Keyboard.JustDown(right) && boxcursorRect.x < 1080) {
			boxCursor.x += 60;
			this.shiftFocus('right');
			//console.log("input--r");
		}

		if (Phaser.Input.Keyboard.JustDown(up) && boxcursorRect.y > 65) {
			boxCursor.y -= 60;
			this.shiftFocus('up');
			//console.log("input--u");

		} else if (Phaser.Input.Keyboard.JustDown(down) && boxcursorRect.y < 842) {
			boxCursor.y += 60;
			this.shiftFocus('down');
			//console.log("input--d");
		}


		if (boxcursorRect.y < 65) {
			boxCursor.y += 60;
			this.shiftFocus('down');
		}

		if (Phaser.Input.Keyboard.JustDown(swap)) {
			// block_container.remove(primaryBlock);
			if (primaryBlock == null || secondaryBlock == null) {

			} else {
				this.swapColors(primaryBlock, secondaryBlock);
			}




		}
		if (Phaser.Input.Keyboard.JustDown(speedUpBtn)) {
			// block_container.remove(primaryBlock);
			block_containerSpeed += 0.05;




		}

		// ________    SWAP BLOCKS _________

		if (Phaser.Input.Keyboard.JustDown(remove)) {
			if (primaryBlock == null || secondaryBlock == null) {

			} else {
				primaryBlock.setTexture('null_block');
				primaryBlock.setData('color', 'null_block');

				secondaryBlock.setTexture('null_block');
				secondaryBlock.setData('color', 'null_block');
			}




		}

		if (Phaser.Input.Keyboard.JustDown(bugR)) {
			console.log(block_container.getAt(0).y);

		}

		if (Phaser.Input.Keyboard.JustDown(bugE)) {
			console.log(block_container.getAt(0).getData('x'), block_container.getAt(0).getData('y'), block_container.getAt(0).getData('color'));
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
		// block_container.iterate(checkVertMatch());


		// Increment focused box





		// SPEED CONTROL
		block_containerRiseSpeed += (block_containerSpeed * delta);

		main_container.y = (0 - block_containerRiseSpeed);


		if (main_container.getBounds().y <= 68) {

			thisScene.start('gameoverScene', { score: !this.score_display });
		}




		// ----------------------------------------------------------------------------------------------------

		if ((time % 60) == 0) {
			this.bubbleUpNull();
			this.matchof4Vert();
			this.matchof4Hori();
			this.matchOf3Vert();
			this.matchOf3Hori();
			this.eliminateRow();
			score_display.setText(game_score_display);
		}
		// if (delay == 100){

		// 	//this.eliminateRow();

		// 	delay = 0;
		// } else if (delay == 50) {

		// 	delay += 2;
		// } else {
		// 	delay += 2;
		// }
		// ---------------




		// Update Debug information

		debugText.setText([
			"checking setup:",
			"testing debug: " + cursorXYText,
			"lft-hovBlkIndex: " + primaryBlockIndex,
			"main_container.y: " + main_container.getBounds().height,
		])


		//---------------------------------------------

	}

	end() {

	}

	bubbleUpNull() {

		for (let row = 0; row < numRows - 1; row++) {
			for (let column = 0; column < 8; column++) {

				let top = (8 * row) + column
				let bot = (8 * (row + 1)) + column

				let block1 = block_container.getAt(top);
				let block2 = block_container.getAt(bot);

				if (block2.getData('color') == 'null_block' && block1.getData('color') != 'null_block') {

					this.swapColors(block1, block2);
					//this.setAlphaOnBlock(block1, block2)
				}
			}
		}
	}

	matchOf3Vert() {

		for (let row = 0; row < numRows - 2; row++) {
			for (let column = 0; column < 8; column++) {

				let top = (8 * row) + column
				let mid = (8 * (row + 1)) + column
				let bot = (8 * (row + 2)) + column

				let block1 = block_container.getAt(top);
				let block2 = block_container.getAt(mid);
				let block3 = block_container.getAt(bot);

				let color = block1.getData('color');

				if ((block1 != null && block2 != null && block3 != null) && (block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color) && color != 'null_block') {
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

	matchOf3Hori() {

		for (let row = 0; row < numRows - 1; row++) {
			for (let column = 0; column < 6; column++) {

				let start = (8 * row) + column
				let mid = (8 * row) + column + 1
				let end = (8 * row) + column + 2

				let block1 = block_container.getAt(start);
				let block2 = block_container.getAt(mid);
				let block3 = block_container.getAt(end);

				let color = block1.getData('color');

				if ((block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color) && color != 'null_block') {
					block1.setData('color', 'null_block');
					block2.setData('color', 'null_block');
					block3.setData('color', 'null_block');

					block1.setTexture('null_block');
					block2.setTexture('null_block');
					block3.setTexture('null_block');

					//this.setAlphaOnBlock(block1, block2, block3);
					// reward points.
					game_score_display += 150;
				}
			}
		}
	}

	matchof4Vert() {
		for (let row = 0; row < numRows - 2; row++) {
			for (let column = 0; column < 8; column++) {

				let top = (8 * row) + column
				let mid1 = (8 * (row + 1)) + column
				let mid2 = (8 * (row + 2)) + column
				let bot = (8 * (row + 3)) + column

				let block1 = block_container.getAt(top);
				let block2 = block_container.getAt(mid1);
				let block3 = block_container.getAt(mid2);
				let block4 = block_container.getAt(bot);

				let color = block1.getData('color');

				if ((block1 != null && block2 != null && block3 != null) && (block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color && block4.getData('color') == color) && color != 'null_block') {
					block1.setData('color', 'null_block');
					block2.setData('color', 'null_block');
					block3.setData('color', 'null_block');
					block4.setData('color', 'bomb_block');

					block1.setTexture('null_block');
					block2.setTexture('null_block');
					block3.setTexture('null_block');
					block4.setTexture('bomb_block');

					//this.setAlphaOnBlock(block1, block2, block3);
					// reward points.
					game_score_display += 300;
				}
			}
		}
	}
	matchof4Hori() {
		for (let row = 0; row < numRows - 1; row++) {
			for (let column = 0; column < 5; column++) {

				let start = (8 * row) + column
				let mid1 = (8 * row) + column + 1
				let mid2 = (8 * row) + column + 2
				let end = (8 * row) + column + 3

				let block1 = block_container.getAt(start);
				let block2 = block_container.getAt(mid1);
				let block3 = block_container.getAt(mid2);
				let block4 = block_container.getAt(end);

				let color = block1.getData('color');

				if ((block1.getData('color') == color && block2.getData('color') == color && block3.getData('color') == color && block3.getData('color') == color && block4.getData('color') == color) && color != 'null_block') {
					block1.setData('color', 'null_block');
					block2.setData('color', 'null_block');
					block3.setData('color', 'null_block');
					block4.setData('color', 'bomb_block');

					block1.setTexture('null_block');
					block2.setTexture('null_block');
					block3.setTexture('null_block');
					block4.setTexture('bomb_block');

					//this.setAlphaOnBlock(block1, block2, block3);
					// reward points.
					game_score_display += 300;
				}
			}
		}
	}

	bombExplosion() {

	}

	eliminateRow() {
		if (this.checkFirstRowEliminated()) {

			block_container.removeBetween(0, 8, true);
			this.addRow();
			//main_container.y -= 60;
		}



	}



	checkFirstRowEliminated() {
		let counter = 0;
		for (let index = 0; index < 8; index++) {

			if ((block_container.getAt(index).getData('color') == 'null_block')) {
				counter += 1;
			}
		}
		if (counter == 8) {
			console.log('8 nulls')
			return true;
		} else {
			return false;
		}

	}




	swapColors(block1, block2) {
		let primaryColor = block1.getData('color');
		let secondaryColor = block2.getData('color');
		if (primaryColor !== secondaryColor || (primaryBlock != null || secondaryBlock != null)) {
			block1.setTexture(secondaryColor)
			block2.setTexture(primaryColor)

			block1.setData('color', secondaryColor);
			block2.setData('color', primaryColor);
		}
	}


	shiftFocus(direction) {
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

	incrementIndex() {

		if (primaryBlockIndex[1] != 7) {
			primaryBlockIndex[1] += 1;
		} else {
			primaryBlockIndex[1] = 0;
			primaryBlockIndex[0] += 1;
		}
	}

	decrementIndex() {

		if (primaryBlockIndex[1] != 0) {
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

	activateVisibleBlocks() {
		block_container.iterate(function (element) {
			if (element.getBounds().y > 860) {
				element.setAlpha(1);
				element.setData('activated', 'true');
			} else {
				element.setAlpha(0.5);
				element.setData('activated', 'false');
			}
		})
	}

	makeRow(increment) {
		const results = [];


		let masterSprite = this.add.sprite(0, 0, "testPlus");
		blockColors = this.shuffle(blockColors);

		for (let index = 0; index < 8; index++) {
			masterSprite = this.add.sprite((index * 60), (0 + increment), blockColors[index]);

			masterSprite.setName('Block' + (nameIncrement) + "-" + index);
			masterSprite.setData({ color: blockColors[index], x: nameIncrement, y: index })
			results.push(masterSprite);

		}
		nameIncrement += 1;
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

		for (let index = 0; index < (numRows * 60); index += 60) {
			gridArray.push(this.makeRow(index));
		}
		return gridArray;
	}

	addRow() {
		var row = this.makeRow((lineRow * 60));
		block_container.add(row);
		lineRow += 1;


	}

	setAlphaOnBlock(block1, block2, block3) {

		if (block1.alpha == 0) {
			block1.setAlpha(1);
		} else {
			block1.setAlpha(0);
		}

		if (block2.alpha == 0) {
			block2.setAlpha(1);
		} else {
			block2.setAlpha(0);
		}

		if (block3.alpha == 0 && block3 != null) {
			block3.setAlpha(1);
		} else {
			block3.setAlpha(0);
		}


	}

	adjustLevel() {
		let containerHeight = main_container.getBounds().y;
		switch (containerHeight) {
			case containerHeight < 10:

				break;

			default:
				break;
		}
	}



}

export default GameScene;
