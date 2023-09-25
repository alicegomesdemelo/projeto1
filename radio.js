//botões
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

//lista de música
const music_list = [
    {
        img : 'imgradio/Baby.png',
        name : 'Baby',
        artist : 'Justin Bieber',
        music : 'musicas/Baby.mp3'
    },
    {
        img : 'imgradio/CruelSummer.jpg',
        name : 'Cruel Summer',
        artist : 'Taylor Swift',
        music : 'musicas/CruelSummer.mp3'
    },
    {
        img : 'imgradio/DoIWannaKnow.jpg',
        name : 'Do I Wanna Know',
        artist : 'Arctic Monkeys',
        music : 'musicas/DoIWannaKnow.mp3'
    }, 
    {
        img : 'imgradio/Flawless.jpg',
        name : 'Flawless',
        artist : 'The Neighbourhood',
        music : 'musicas/Flawless.mp3'
    }, 
    {
        img : 'imgradio/Positions.jpg',
        name : 'Positions',
        artist : 'Ariana Grande',
        music : 'musicas/Positions.mp3'
    },
    {
        img : 'imgradio/Salvatore.jpg',
        name : 'Salvatore',
        artist : 'Lana Del Rey',
        music : 'musicas/Salvatore.mp3'
    }, 
    {
        img : 'imgradio/Starboy.png',
        name : 'Starboy',
        artist : 'The Weeknd',
        music : 'musicas/Starboy.mp3'
    }, 
    {
        img : 'imgradio/Style.png',
        name : 'Style',
        artist : 'Taylor Swift',
        music : 'musicas/Style.mp3'
    }, 
    {
        img : 'imgradio/ThatsWhatILike.png',
        name : 'That´s What I Like',
        artist : 'Bruno Mars',
        music : 'musicas/ThatsWhatILike.mp3'
    },
    {
        img : 'imgradio/WatermelonSugar.jpg',
        name : 'Watermelon Sugar',
        artist : 'Harry Styles',
        music : 'musicas/WatermelonSugar.mp3'
    }
];

//Funão para tocar a lista de músicas
loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

//Função de minutagem da música atual
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

//Função para alternar entre play e pause na música atual
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

//Função para iniciar a música 
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

//Função para pausar a música 
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

//Função para avançar à próxima música 
function nextTrack(){
    if(track_index < music_list.length - 1){
        track_index += 1;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

//Função para retroceder à música anterior
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

//Funções para percorrer o tempo da música
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
