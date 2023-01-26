// SimpleParticles v1.1 by mcf
// a very simple particle system (size/scale not yet implemented)
// p.s. see examples at bottom of file

var particles = new SimpleParticles(); // how to use: particles.add();
const PARTICLES_ENABLED = true; // if false, no particles at all

// game-specific fx
function carExhaustFX(x,y,alpha=0.5) {
    var num = 1; //randomInt(0,1); // sometimes adds none?
    for (var i = 0; i < num; i++) {
        let life = randomInt(555,999);
        let size = randomInt(1,4);
        let rotspd = Math.random()*0.5-0.25;
        let ang = 0;
        let velx = Math.random()*3-1.5;
        let vely = Math.random()*-1.5;
        particles.add(x,y,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function SimpleParticles() { // class constructor
    var particle = [];
    this.add = function (x, y, sprite, life, size, rotationSpeed, forcedAngle, velX, velY, myAlpha) {
        if (!PARTICLES_ENABLED) return;
        var p, pnum, pcount;
        if (velX == undefined) velX = 0;
        if (velY == undefined) velY = 0;
        if (myAlpha == undefined) myAlpha = 1;
        if (rotationSpeed == undefined) rotationSpeed = Math.random() * 3 - 2;
        if (forcedAngle == undefined) forcedAngle = 0;
        for (pnum = 0, pcount = particle.length; pnum < pcount; pnum++) {
            p = particle[pnum];
            if (p && p.inactive) { break; } // found one we can reuse
        }
        if (!p || !p.inactive) { // we need a new one
            var newParticle = { inactive: true };
            particle.push(newParticle);
            p = newParticle;
        }
        if (p && p.inactive) { // reuse an old one
            p.x = x;
            p.y = y;
            p.inactive = false;
            p.sprite = sprite;
            p.size = size;
            p.life = life;
            p.birth = (new Date()).getTime();
            p.death = p.birth + life;
            p.angle = forcedAngle;
            p.alpha = myAlpha;
            p.maxalpha = myAlpha;
            p.rotSpd = rotationSpeed;
            p.velX = velX;
            p.velY = velY;
        }
    }

    this.update = function () {
        if (!PARTICLES_ENABLED) return;
        var timestamp = (new Date()).getTime();
        particle.forEach(
            function (p) {
                if (!p.inactive) {
                    p.age = timestamp - p.birth;
                    var lifePercent = (p.age / p.life);
                    if (lifePercent > 1) lifePercent = 1;
                    if (lifePercent < 0) lifePercent = 0;
                    p.x += p.velX; // move
                    p.y += p.velY;
                    p.velX *= 0.94; // slow down
                    p.velY *= 0.94;
                    p.scale = p.size * lifePercent; // grow
                    p.alpha = (1 - lifePercent) * p.maxalpha; // fade
                    p.angle = Math.PI * 2 * lifePercent * p.rotSpd;
                    if (timestamp >= p.death) p.inactive = true;
                }
            });
    }

    this.draw = function (offsetx=0,offsety=0) {
        if (!PARTICLES_ENABLED) return;
        canvasContext.save();
        canvasContext.translate(offsetx,offsety);
        
        particle.forEach(
            function (p) {
                if (!p.inactive) {

					// DRAW A PARTICLE!
					canvasContext.save();
					canvasContext.translate(p.x, p.y);
					if (p.angle !== undefined) canvasContext.rotate(p.angle);
					if (p.alpha !== undefined) canvasContext.globalAlpha = p.alpha;
					canvasContext.drawImage(p.sprite, -p.sprite.width / 2, -p.sprite.height / 2);
					canvasContext.restore();


                }
            }
        );
        canvasContext.restore();
    }

    // immediately clears all particles
    this.clear = function () { particle = []; }
};

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min; }

// return one item from an array
function randomChoice(choices) { return choices[randomInt(0, choices.length-1)]}

/*

// examples!!

function torch_particles(x, y) {
    var num = randomInt(0,1); // sometimes adds none
    for (var i = 0; i < num; i++) {
        let life = randomInt(333,777);
        let size = randomInt(1,4);
        let rotspd = Math.random()*0.3-0.15;
        let ang = 0;
        let velx = Math.random()*3-1.5;
        let vely = Math.random()*-1.5;
        let alpha = 0.5;
        particles.add(x,y,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function blood_particles(x, y) {
    var num = 8; // sometimes adds none
    for (var i = 0; i < num; i++) {
        let life = randomInt(333,777);
        let size = 1;
        let rotspd = Math.random()*0.3-0.15;
        let ang = 0;
        let velx = Math.random()*7-1.5;
        let vely = Math.random()*-3;
        let alpha = 0.5;
        particles.add(x,y,bloodPic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function treasure_chest_particles(x, y) {
    for (var i = 0; i < 32; i++) {
        let life = randomInt(1000,2000);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*2-1.5;
        let vely = Math.random()*-8;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function pickup_key_sparkly_particles(x, y) {
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function door_open_particles(x, y) {
    for (var i = 0; i < 64; i++) {
        let life = randomInt(1500,2500);
        let size = 10;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*2-1;
        let vely = Math.random()*2-1;
        let ofsx = Math.random()*100-50;
        let ofsy = Math.random()*100-50;
        let alpha = 0.5;
        particles.add(x+ofsx,y+ofsy,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function trap_particles(x, y) {
    var num = randomChoice([0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])
    for (var i = 0; i < num; i++) {
        let life = randomInt(000,333);
        let size = 1;
        let rotspd = Math.random()*0.3-0.15;
        let ang = 0;
        let velx = Math.random()*3-1.5;
        let vely = Math.random()*-1.5;
        let alpha = 0.2;
        particles.add(x,y,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function slow_smoke(x, y) {
    if (Math.random()>0.1) return; // only spawn occasionally
    var num = 1; 
    for (var i = 0; i < num; i++) {
        let life = randomInt(2222,4444);
        let size = randomInt(1,4);
        let rotspd = Math.random()*2-1;
        let ang = 0;
        let velx = Math.random()*1-0.5;
        let vely = Math.random()*-0.25;
        let alpha = 0.25;
        let spawnxoffset = Math.random()*40-20;
        particles.add(x+spawnxoffset,y,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function golem_particles(x, y) {
    if (Math.random()>0.25) return; // only spawn 25% of the time
    var num = 1; 
    for (var i = 0; i < num; i++) {
        let life = randomInt(2222,3333);
        let size = Math.random()*4;
        let rotspd = Math.random()*3-1.5;
        let ang = 0;
        let velx = Math.random()*2-1;
        let vely = Math.random()*-2;
        let alpha = 0.5;
        particles.add(x,y,redSparkPic,life,size,rotspd,ang,velx,vely,alpha);
    }
}


function ghost_wisp(x, y) {
    if (Math.random()>0.1) return; // only spawn occasionally
    var num = 1; 
    for (var i = 0; i < num; i++) {
        let life = randomInt(2222,4444);
        let size = randomInt(1,4);
        let rotspd = Math.random()*2-1;
        let ang = 0;
        let velx = Math.random()*1-0.5;
        let vely = Math.random()*-0.25;
        let alpha = 0.25;
        let spawnxoffset = Math.random()*40-20;
        particles.add(x+spawnxoffset,y,ghostWispPic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function projectile_particle(x, y) {
    var num = 8; // sometimes adds none
    for (var i = 0; i < num; i++) {
        let life = randomInt(333,777);
        let size = 1;
        let rotspd = Math.random()*0.3-0.15;
        let ang = 0;
        let velx = Math.random()*7-1.5;
        let vely = Math.random()*-3;
        let alpha = 0.5;
        particles.add(x,y,projectileParticlePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

*/