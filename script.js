const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
// The Element.getBoundingClientRect() method returns a DOMRect object
// providing information about the size of an element and its position relative to the viewport.



class Explosion
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.spriteWidth = 1000 / 5;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;  // shrink down 2 times than the original
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
    }
    update()
    {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 10 === 0) // every 10 increase of timer, frame increase by 1
            this.frame++; // the frame increase infinite
    }
    draw()
    {
        ctx.save();
        // save the current state of canvas make sure the following changes affect only one draw call
        ctx.translate(this.x, this.y);
        // translate rotation center point on top of current object
        ctx.rotate(this.angle); // rotate entire canvas context by random angle value


        ctx.drawImage(this.image,
            this.frame * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
        // restore canvas context to the original save point to make sure
        // this translate and rotate only affacts one draw call of one object
    }
}

// when mouse click
window.addEventListener('click', function(e)
{
    createAnimation(e)
});

function createAnimation(e)
{
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

// a function to cycle through all objects in the array to update and draw them
function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++)
    {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5)
        {
            explosions.splice(i, 1);
            // remove at i, remove 1 object.
            i--;
            // decrement the index i
        }
    }
    requestAnimationFrame(animate);
}
animate();
