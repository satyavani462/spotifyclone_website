let songindex = 1;
let audio = new Audio('1.mp3');
// audio.play();
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('progressBar');
let equalizer = document.getElementById('equalizer');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songname: 'Aasha Paasham-C/O KC', filepath: '1.mp3', coverpath: '1.jpg' },
    { songname: 'Dheera Dheera -KGF', filepath: '2.mp3', coverpath: '2.jpg' },
    { songname: 'Psycho Saiyaan - Saaho', filepath: '3.mp3', coverpath: '3.jpg' },
    { songname: 'NCS-BGM', filepath: '4.mp3', coverpath: '4.jpg' },
    { songname: 'Willow - Taylor Swift', filepath: '5.mp3', coverpath: '5.jpg' },
    { songname: 'Let Me Love You - Justin Beiber', filepath: '6.mp3', coverpath: '6.jpg' }
]
songitem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songname;
})
//play/pause
masterplay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        equalizer.style.opacity = 1;
        Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
            if (element.id == songindex) {
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
            }
        })
    }
    else {
        audio.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        equalizer.style.opacity = 0;
        Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
            if (element.id == songindex) {
                element.classList.remove('fa-circle-pause');
                element.classList.add('fa-circle-play');
            }
        })
    }
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
//events
audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressbar.value = progress;
    if(audio.ended){
        if(songindex<=6)
        {
        songindex+=1;
        }
        else{
            songindex=0
        }
        audio.src=`${songindex}.mp3`;
        audio.play();
        mastersongname.innerText = songs[songindex - 1].songname;
        makeAllPlays();
        Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
            
            if (element.id == songindex) {
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
            }
        })
    }
});
progressbar.addEventListener('change', () => {
    audio.currentTime = progressbar.value * audio.duration / 100;
    if(audio.ended){
        if(songindex<=6)
        {
            songindex+=1;
        }
        else{
            songindex=0
        }
        audio.src=`${songindex}.mp3`;
        audio.play();
        mastersongname.innerText = songs[songindex - 1].songname;
        makeAllPlays();
        Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
            if (element.id == songindex) {
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
            }
        })
    }
})

Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = e.target.id;
        mastersongname.innerText = songs[songindex - 1].songname;
        audio.currentTime = 0;
        audio.src = `${songindex}.mp3`;
        // console.log(songindex)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audio.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        equalizer.style.opacity = 1;
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 6) {
        songindex = 1;
    }
    else {
        songindex = songindex + 1;
    }
    audio.currentTime = 0;
    audio.src = `${songindex}.mp3`;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    mastersongname.innerText = songs[songindex - 1].songname;
    equalizer.style.opacity = 1;
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        if (element.id == songindex) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
        else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })

})
document.getElementById('prev').addEventListener('click', () => {
    if (songindex <= 1) {
        songindex = 6;
    }
    else {
        songindex = songindex - 1;
    }
    audio.currentTime = 0;
    audio.src = `${songindex}.mp3`;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    mastersongname.innerText = songs[songindex - 1].songname;
    equalizer.style.opacity = 1;
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        if (element.id == songindex) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
        else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })
})