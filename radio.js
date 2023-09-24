let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;

const music_list = [
    {
        name: 'Baby',
        music : 'musicas/Baby.mp3'
    },
    {
        name: 'Style',
        music : 'musicas/Style.mp3'
    },
    // Adicione mais músicas conforme necessário
];

loadTrack(track_index);

function loadTrack(track_index) {
    curr_track.src = music_list[track_index].music;
    curr_track.load();
}

function playpauseTrack() {
    if (isPlaying) {
        curr_track.pause();
    } else {
        curr_track.play();
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    track_index = (track_index + 1) % music_list.length;
    loadTrack(track_index);
    curr_track.play();
    isPlaying = true;
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    curr_track.play();
    isPlaying = true;
}
