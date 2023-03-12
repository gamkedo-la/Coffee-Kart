

var countdown_beep = new Audio('sounds/countdown_beep.mp3');
countdown_beep.volume = 0.5;

var countdown_start = new Audio('sounds/countdown_start.mp3');
countdown_start.volume = 0.5;

var snowMusic = new Audio('sounds/snowMusic-Coffeekart.mp3');
snowMusic.volume = 0.2;
snowMusic.loop = true;

var cafeMusic = new Audio('sounds/coffeeKart-rock.mp3');
cafeMusic.volume = 0.2;
cafeMusic.loop = true;

var jungleMusic = new Audio('sounds/coffeeKart-add-guitarHarmonics.mp3');
jungleMusic.volume = 0.2;
jungleMusic.loop = true;

function switchSong(songName) {
    if (jukeBox != null) {
        jukeBox.pause();
    }
    if (songName == "snowMusic") {
        jukeBox = snowMusic;        
    }
    if (songName == "cafeMusic") 
    {
        jukeBox = cafeMusic;
    }
    if (songName == "jungleMusic") 
    {
        jukeBox = jungleMusic;
    }
    jukeBox.play();
}

function updateSounds() {
    if (gGameState == GS_RACING) {
        if (courseIndex == SNOW_LEVEL) {
            if (jukeBox != snowMusic) {
                switchSong("snowMusic");                
            }
        }
        if (courseIndex == CAFE_LEVEL) {
            if (jukeBox != cafeMusic) {
                switchSong("cafeMusic");                
            }
        }

        if (courseIndex == JUNGLE_LEVEL) {
            if (jukeBox != jungleMusic) {
                switchSong("jungleMusic");                
            }
        }
    }
}