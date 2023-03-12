

var countdown_beep = new Audio('sounds/countdown_beep.mp3');
countdown_beep.volume = 0.5;

var countdown_start = new Audio('sounds/countdown_start.mp3');
countdown_start.volume = 0.5;

var beans_scoop_sound = new Audio('sounds/beans_scoop.wav');
beans_scoop_sound.volume = 0.4;
beans_scoop_sound.loop = false;

var beans_grind_sound = new Audio('sounds/beans_grind.wav');
beans_scoop_sound.volume = 0.5;
beans_scoop_sound.loop = false;

var beans_pour_sound = new Audio('sounds/beans_pour_ground.wav');
beans_pour_sound.volume = 0.5;
beans_pour_sound.loop = false;

var sip_sound = new Audio('sounds/sip.wav');
sip_sound.volume = 0.6;
sip_sound.loop = false;

var aero_eject_sound = new Audio('sounds/aero_eject.wav');
aero_eject_sound.volume = 0.5;
aero_eject_sound.loop = false;

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