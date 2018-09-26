var songs = ["Song1 - Artist", "Song2 - Artist", "Song3 - Artist"];
var songTitle = document.getElementById("songTitle");
var fillBar = document.getElementById("fill");

var song = new Audio();
var currentSong = 0;

var currentTime = document.getElementById("currentTime");

window.onload = (playSong);

function playSong()
{
    song.src = "music/" + songs[currentSong] + ".mp3";
    songTitle.textContent = songs[currentSong];
    song.play();
}

function playOrPauseSong(){
            
    if(song.paused)
    {
        song.play();
        $("#play img").attr("src","images/pause.png");
    }
    else
    {
        song.pause();
        $("#play img").attr("src","images/play.png");        
    }
}

song.addEventListener('timeupdate',
function()
{
    var position = song.currentTime / song.duration;
    fillBar.style.width = position * 100 + '%';

    convertTime(Math.round(song.currentTime));

    if(song.ended)
    {
        next();
    }
});

function convertTime(seconds)
{
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent = (min + ":" + sec);

    totalTime(Math.round(song.duration));
}

function totalTime(seconds)
{
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent += " / " + min + ":" + sec;
}

function next()
{
    currentSong++;
    if(currentSong > songs.length-1)
    {
        currentSong = 0;
    }
    playSong();
    $("#play img").attr("src", "images/pause.png");
}

function prev()
{
    currentSong--;
    if(currentSong < 0)
    {
        currentSong = songs.length - 1;
    }
    playSong();
    $("#play img").attr("src", "images/pause.png");
}

function mute()
{
    if(song.muted == true)
    {
        song.muted = false;
        $("#sound img").attr("src", "images/sound.png");
    }
    else
    {
        song.muted = true;
        $("#sound img").attr("src", "images/mute.png");
    }
}
