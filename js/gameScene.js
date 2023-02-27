

// Text
var text;

var cursorDebugText = 0
var cursorDebugText2 = 0
var cursorXYText

var centerPointTester;

// object details
var boxCursor;

var boxcursorRect;
var containerRiseSpeed = 0.005;
var containerChildren = [];

var nameIncrement = 0;

var primaryBlock;
var secondaryBlock;


var primaryBlockName;
var primaryBlockIndex = [0, 3];

var secondaryBlockName;
var secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];


var blocks = ["gold_block", "red_block", "blue_block", "green_block", "orange_block", "pink_block", "purple_block", "black_block"];

// Game rules
var numRows = 14;
var left, right, up, down, swap, devBtn1, devBtn2, devBtn3;



class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: 'gameScene' });
		this.move = 0;
		this.x = 0;
		this.y = 0;
	}

	init() {

	};

	preload() {
		this.load.image('cursor', '/resources/img/cursor.png');
		this.load.image('white_background', '/resources/img/white_background.png');
		this.load.image('gold_block', '/resources/img/gold_block_lg.png');
		this.load.image('red_block', '/resources/img/red_block_lg.png');
		this.load.image('blue_block', '/resources/img/blue_block_lg.png');
		this.load.image('black_block', '/resources/img/black_block_lg.png');
		this.load.image('purple_block', '/resources/img/purple_block_lg.png');
		this.load.image('pink_block', '/resources/img/pink_block_lg.png');
		this.load.image('green_block', '/resources/img/green_block_lg.png');
		this.load.image('orange_block', '/resources/img/orange_block_lg.png');
		this.load.image('testPlus', '/resources/img/testPlus.png');
		this.load.image('blueBorder', '/resources/img/blueborder.png');
		this.load.spritesheet('testfleet', '/resources/img/testPlus.png', { frameWidth: 40, frameHeight: 30 });
	}



	create() {
		console.log("Created.");

		// add background and border
		var bg = this.add.image(0, 0, 'white_background');
		bg.setOrigin(0, 0);
		bg.displayWidth = this.sys.canvas.width;
		bg.displayHeight = this.sys.canvas.height;
		// -------------------------


		// TESTING SQUARE 
		var testPlus = this.add.image(721.5, 511.5, "testPlus").setScale(4);
		// ---------------

		// Add container, position origin at cent of screen offset -210
		this.container = this.add.container((screen.width/2) -210, screen.height/2 + 215);
		//this.container.add(testPlus);
		
		// ------------------------------------------------------------

		// Make the grid of blocks based off of the numRows variable. Add to container
		this.makeGrid(numRows).forEach(element => {
			for (let index = 0; index < element.length; index++) {
				containerChildren.push(element[index])
			}
		});
		// ----------------------------------------------------------------------------

		this.container.add(containerChildren);


		// Add blue bordered game boundry
		var grid_box = this.add.container(screen.width / 2, (screen.height / 2))
		
		grid_box.add([this.add.image(0, 10, "blueBorder")]);
		// --------------------------------

		// Make debug text in top left
		text = this.add.text(10, 100, 'Cursor Position: 0, 0', { font: '32px Courier', fill: '#000000' });
		// --------------------------
		

		// Create keybindings 
		left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		swap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		devBtn1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		devBtn2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		devBtn3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// ------------------------------

		// Create Cursor
		boxCursor = this.add.sprite(0, 0, 'cursor');
		boxCursor.setName('BoxCursor');
		this.container.add(boxCursor);
    	boxCursor.setPosition(210, 0);
		boxCursor.setScale(1.0);
		//------------------------------
		
		// Create array of all current blocks for testing
		
		
		//---------------------------------------------
		
		

		// this.container.children.iterate(function(element){
		// 	element.setInteractive();
		// })

		this.container.getAll().forEach(element => {
			element.setInteractive();
		});
		
			
		
	}

	update() {
		boxcursorRect = boxCursor.getBounds();
		// check for match
		// remove
		// raise
		cursorXYText = this.container.getByName('BoxCursor') + ": x:" + boxcursorRect.x + "| y: " + boxcursorRect.y;

		// HOVERED BLOCK INFORMATION _____________________________________________________
		primaryBlockName = "Block" + primaryBlockIndex[0] + "-" + primaryBlockIndex[1];
		secondaryBlockIndex = [primaryBlockIndex[0], primaryBlockIndex[1] + 1];
		primaryBlock = this.container.getByName(primaryBlockName);

		secondaryBlockName = "Block" + secondaryBlockIndex[0] + "-" + secondaryBlockIndex[1];
		secondaryBlock = this.container.getByName(secondaryBlockName);
		

		// _______________________________________________________________________________

		//currentElement = this.container.getData(primaryBlockName);

		// Update and listen for directional cursor movement
		if (Phaser.Input.Keyboard.JustDown(left) && boxcursorRect.x > 726) {
			boxCursor.x -= 60;
			this.shiftFocus('left');
			console.log("input--l");

		} else if (Phaser.Input.Keyboard.JustDown(right) && boxcursorRect.x < 1086) {
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

		// Increment focused box


		if (Phaser.Input.Keyboard.JustDown(devBtn3)) {
			// this.container.remove(primaryBlock);
			let primaryColor = primaryBlock.getData('color');
			let secondaryColor = secondaryBlock.getData('color');
			if (primaryColor !== secondaryColor){
				primaryBlock.setTexture(secondaryColor)
				secondaryBlock.setTexture(primaryColor)

				primaryBlock.setData('color', secondaryColor);
				secondaryBlock.setData('color', primaryColor);
			}
			
		}

		// ________    SWAP BLOCKS _________

		if (Phaser.Input.Keyboard.JustDown(swap)){
			// this.container.swap(this.container.getIndex(3), this.container.getIndex(4));
			
			

			console.log("swapped" + "("+primaryBlockName + "And" + secondaryBlockName +
			")")
		}

		// -----------------------------------------------------

		
		// if (Phaser.Geom.Rectangle.Overlaps(boxCursor.getBounds(), primaryBlock.getBounds())){
		// 	cursorDebugText = "True";
		// } else {
		// 	cursorDebugText = "False";
		// }
		// ------------------------------------------------------------

		// check for hover 
		// this.container.iterate(function(element){
			
		// 	let center = [55, 5];

		// 	if (!nullBody && (element.getData('name'))){
		// 		nullBody = true;
		// 		centerPointTester = center + ", " + element.getData('name') + ": " + element.getCenter().x;
				
		// 		primaryBlock = element;
				

		// 	}

			
			
			

			// if (Phaser.Geom.Rectangle.ContainsPoint(Phaser.Display.Bounds.GetBounds(boxCursor), [blockCenterX, blockCenterY])){
			// 	cursorDebugText = "You're hovering over a sprite.";
				
			// } else {
			// 	cursorDebugText += 0.005
			// }
			// if (Phaser.Geom.Intersects.RectangleToRectangle(boxCursor.getBounds(), widthBlock)){
			// 	cursorDebugText += 0.01;
			// }


		// })
		containerRiseSpeed += 0.05;
		this.container.y = ((screen.height/2) - containerRiseSpeed);
		
		if (this.container.y <= 100){
			this.container.y = ((screen.height/2));
			containerRiseSpeed = 0.005;
		}
		

		
		
		// ---------------
		
		// Update Debug information
		
		
		text.setText([
			'position_in_container: ' + boxCursor.x + ", " + boxCursor.y,
			cursorXYText,

			"Current Block: " + primaryBlockIndex,
			"Second Block" + secondaryBlockIndex
			
		]);

		//---------------------------------------------

	}

	end() {

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
		blocks.push(blocks.shift());
		
		for (let index = 0; index < 8; index++) {
			masterSprite = this.add.sprite((index*60), (0+increment), blocks[index]);
			masterSprite.setName('Block'+(nameIncrement)+"-"+index);
			masterSprite.setData('color', blocks[index])
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
		this.container.add(row);
	}

}

// class GameBlock extends Phaser.GameObjects.Sprite {

//     constructor (scene, x, y, texture, isHovered=false, state){
//         super(scene, x, y, texture);

// 		this.scene = scene
//         this.texture = texture;
//         this.isHovered = isHovered;
//         this.state = state;
//     }
// }

export default GameScene;