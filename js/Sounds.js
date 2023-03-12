

var countdown_beep = new Audio('sounds/countdown_beep.mp3');
countdown_beep.volume = 0.5;

var countdown_start = new Audio('sounds/countdown_start.mp3');
countdown_start.volume = 0.5;


const MUSIC_VOLUME = 0.2;

var jukeBoxCurrent = null;

function switchSong(songName) {
    if (jukeBox != null) {
        jukeBox.pause();
    }
    jukeBox = new Audio('sounds/' + songName + '.mp3');
    jukeBox.loop = true;
    jukeBox.volume = MUSIC_VOLUME;
    jukeBox.play();

    
}

function updateSounds() {
    if (gGameState == GS_RACING) {
        if (courseIndex == SNOW_LEVEL) {
            if (jukeBoxCurrent != "snowMusic") {
                jukeBoxCurrent = "snowMusic";
                switchSong("snowMusic");
            }
        }
        if (courseIndex == CAFE_LEVEL) {
            if (jukeBoxCurrent != "cafeMusic") {
                jukeBoxCurrent = "cafeMusic";
                switchSong("cafeMusic");
            }

            
        }

        if (courseIndex == JUNGLE_LEVEL) {
            if (jukeBoxCurrent != "jungleMusic") {
                jukeBoxCurrent = "jungleMusic";
                switchSong("jungleMusic");
            }
            
        
        }
    } else { 
        if (jukeBoxCurrent != "menuMusic") {
            jukeBoxCurrent = "menuMusic";
            switchSong("menuMusic");
        }         
     }
}