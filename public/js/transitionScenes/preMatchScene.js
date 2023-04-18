let countdown = 5;
export default class PreMatchScene extends Phaser.Scene {
    constructor(config) {
        super('preMatchScene');
        var self = this;
        this.user = config.user;
        this.ably = config.ably;
        this.isHost;

        this.lobbyChannel = this.ably.channels.get('lobby', { presence: true, state: true });
        this.lobbyChannel.presence.update({ occupancy: 0, screenname: this.user.screenname, id: this.user.id });
        this.lobbyChannel.presence.enter();
    }

    init(data) {
        this.isHost = data.isHost;
        this.countdown = 5;
        this.countdownTimer = null;
    }

    preload() {
        this.load.image('lobbyBackground', '/img/lobbyBackground.png');
        this.load.bitmapFont('smooth', '/img/atari-smooth.png', '/img/atari-smooth.xml');
    }

    create() {
        this.lobbyChannel.subscribe((message) => {
            if (message.name === 'begin'){
                this.scene.start('multiplayerGameScene', {lobby: this.lobbyChannel, seed: message.data.key})
            }
            if (message.name === 'start-game' && this.lobbyChannel.presence.get().length == 2) {
                if (this.countdownTimer === null) {
                    this.countdownTimer = this.time.addEvent({
                        delay: 1000, // fire every second
                        callback: () => {
                            this.countdown--;

                            if (this.countdown === 0) {
                                // Send the channel they are connected on to the next gameScene
                                this.scene.start('multiplayerGameScene', { channel: this.lobbyChannel });
                            } else {
                                console.log(`Starting game in ${this.countdown} seconds`);
                            }
                        },
                        callbackScope: this,
                        repeat: 4, // repeat 4 times (total of 5 seconds)
                    });
                }
            } else {
                this.countdownTimer?.destroy(); // stop the timer if there are less than 2 players
                this.countdownTimer = null;
                this.countdown = 5;
            }
        }, this); // bind `this` to the callback function

        var bg = this.add.sprite(0, 0, 'lobbyBackground');
        bg.setOrigin(0, 0);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;

        if (self.isHost) {
            console.log("You're the host")
            this.add.bitmapText(100, 100, 'smooth', 'You are hosting');

            this.lobbyChannel.presence.subscribe('enter', (user) => {
                console.log(`${user.data.screenname} has joined`);

                if (user.data !== this.user){
                    this.lobbyChannel.publish({
                        name: 'begin',
                        seed: '12345',
                    });
                }
            });
                // const occupancy = this.lobbyChannel.presence.get().length;
                // console.log(occupancy);
            //     if (occupancy > 2) {
            //         this.lobbyChannel.presence.leave(user.id, (err) => {
            //             if (err) {
            //                 console.error('Error leaving channel:', err);
            //             } else {
            //                 console.log('Rejected member, lobby full:', user.id);
            //                 this.scene.start('lobbyScene');
            //             }
            //         });
            //     } else if (occupancy === 2) {
            //         this.lobbyChannel.publish({name: 'start-game'});

            //     } else {
            //         // If the occupancy is less than or equal to 2, update the occupancy state
            //         this.lobbyChannel.presence.update({ occupancy: occupancy });
            //         console.log('Accepted member:', user.id);
            //     }
            // });


            // Subscribe to channel data updates
            this.lobbyChannel.subscribe('update', (message) => {
                if (message.data.gameHost) {
                    const gameHost = message.data.gameHost;

                }
            });
            // Fetch the list of users present on the channel
            this.lobbyChannel.presence.get((err, members) => {
                if (err) {
                    console.error('Error fetching presence data:', err);
                } else {
                    members.forEach((member) => {
                        if (member.clientId !== this.ably.auth.clientId) {
                            const userData = member.data;
                            console.log('userData: ', userData);
                        }
                    });
                }
            });

        } else {
            console.log("You're challenging.")
            this.add.bitmapText(100, 100, 'smooth', 'You are challenging');
            // Get a reference to the channel


            this.lobbyChannel.presence.enter(this.user, (err) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('Entered channel successfully');
                    this.lobbyChannel.publish('enter', { data: { key: 'challengerJoined', user: data } });
                }
            });
        }

        this.lobbyChannel.presence.subscribe('leave', (user) => {
            // Update the occupancy state when a member leaves the channel
            const occupancy = this.lobbyChannel.presence.get().length;
            this.lobbyChannel.presence.update({ occupancy: occupancy });
            console.log("user Left");
        });


        window.addEventListener('beforeunload', (event) => {
            // Trigger a "leave" presence event before the window is closed
            this.lobbyChannel.presence.leave((err) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('User Left');
                    this.lobbyChannel.publish('leave', { data: { key: 'userLeft', user: data } });
                }
            });

            event.preventDefault();
            event.returnValue = '';
        });
        console.log("end of scene");

    }

    update(time, delta) {
    }
}
