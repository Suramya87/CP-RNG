class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X_MIN = 200
        this.SHOT_VELOCITY_X_MAX = 800

        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX =1100



    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/2, height/10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width /4)
        this.cup.body.setImmovable(true)
        // add ball
        const BALLS = () => {
        this.ball = this.physics.add.sprite(width / 2, height-height/10, 'ball')
        this.ball.body.setCircle(this.ball.width /2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)
        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball,cup)=>{
            ball.destroy()
            BALLS()
        })

        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)
        };

        let wallA = this.physics.add.sprite(0, height / 4, 'wall');
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2))
        
        wallA.body.setCollideWorldBounds(true);
        wallA.body.setVelocityX(400);
        wallA.body.setBounce(1); 
        wallA.body.setImmovable(true);

        let wallB = this.physics.add.sprite(0,height/2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width /2, width - wallB.width /2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])
        // add one-way
        this.oneWay = this.physics.add.sprite(0,height/4 * 3 , 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width /2, width - this.oneWay.width /2))
        this.oneWay.body.setCollideWorldBounds(true)
        this.oneWay.body.setVelocityX(300);
        this.oneWay.body.setBounce(1); 
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        this.oneWay.body.onWorldBounds = true;

        // add pointer input
        this.input.on('pointerdown', (pointer) => {
            let shotDirection_x = pointer.x <= this.ball.x ? 1 : -1

            let shotDirection_y = pointer.y <= this.ball.y ? 1 : -1
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X_MIN, this.SHOT_VELOCITY_X_MAX) * shotDirection_x)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection_y)

        })
        BALLS()
     }

    update() {
    }
}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[X] Add ball reset logic on successful shot
[X] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[X] Make one obstacle move left/right and bounce against screen edges
[ ] Create and display shot counter, score, and successful shot percentage
*/