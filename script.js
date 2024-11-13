// Array dei file mp3 per ogni album
const albums = {
    album1: ["Non Capisco - Feat. Al Castellana.mp3", "Dico A Voi - Feat. Nesli.mp3", "Marziane Arti Marziali - Feat. Seka Sek L300.mp3", "Per Quel Giorno.mp3", "Tanto Vale Dirselo.mp3", "SEI IL NOSTRO IDOLO.mp3", "Sei Cavaliere - Feat Turi.mp3", "Come Viene.mp3", "Che andamento assicuro - Feat Turi.mp3", "E dire che tu - Feat. Rachel Anne.mp3", "Meglio così .mp3"],
    album2: ["Dancehall feat Entics  & Fabri Fibra.mp3", "Freestyle (1) - Feat. Fabri Fibra.mp3", "Freestyle (2) - Feat. Fabri Fibra.mp3", "Via Con Me - Feat. Supa, Fabri Fibra, Danti, Daniele Vit.mp3", "Mamma Mia - Feat. Fabri Fibra.mp3"],
    album3: ["Freestyle Solido.mp3", "La Soluzione RMX - Featt. Pula+, Danti.mp3", "Numero Uno.mp3", "Tranne Te RMX - Feat. Redman, Soprano, Marracash, Dargen D'Amico, Entics.mp3", "La Tua Logica - Feat. Nesli.mp3", "Prima Che Sia Domani - Feat. Al Castellana.mp3", "Double Trouble RMX - Feat. DJ Double S.mp3", "Quelle Radio.mp3", "Sono Hip Hop.mp3", "Qualcuno Normale - Feat. DJ Double S.mp3", "Sotto Shock.mp3", "Tranne Te RMX - Feat. Danti.mp3", "Escort RMX - Feat. Entics.mp3", "Freestyle Gasato.mp3", "Freestyle Liquido.mp3"],
    album4: ["Il Gusto Di Fare.mp3", "Maniacali testimonial locali.mp3", "Più Ne Scrivo.mp3", "Ti Vizio.mp3", "Fino alla prossima sosta.mp3", "Fulo + Word.mp3", "Di chi ti ricordi per sorridere.mp3", "Il Mio Stampo.mp3", "In Riviera.mp3"],
    album5: ["Una Minima Feat. Fabri Fibra & Dj Inesha.mp3", "Si tengo que hacerlo - El Invikto & Fabri Fibra.mp3", "A che brindi - Feat. Marya.mp3", "Il colpo di troppo - Feat. Marya.mp3"]
};

let isPlaying = false;
let audio = new Audio();
audio.volume = 0.5;
let currentView = 'main';

// Helper function to update content
function updateContent(htmlContent) {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = '';
    contentDiv.innerHTML = htmlContent;
}

// Helper function to create album or playlist elements
function createFolderElement(name, onclickFunction) {
    return `<div class="folder" onclick="${onclickFunction}">${name}</div>`;
}

function openPlaylist() {
    const playlistHTML = `
        ${createFolderElement('[Basley Click]', "openAlbum('album1')")}
        ${createFolderElement('[SONOCAZZIMIEI]', "openAlbum('album2')")}
        ${createFolderElement('[Venerdi 17]', "openAlbum('album3')")}
        ${createFolderElement('[Dinamite Mixtape]', "openAlbum('album4')")}
        ${createFolderElement('[Featurings]', "openAlbum('album5')")}
    `;
    updateContent(playlistHTML);
    currentView = 'playlist';
    toggleBackButton(true);
}

function openAlbum(album) {
    const albumHTML = albums[album].map(fileName => createFolderElement(`[${fileName}]`, `playSong('${album}/${fileName}')`)).join('');
    updateContent(albumHTML);
    currentView = 'album';
    toggleBackButton(true);
}

function playSong(songPath) {
    audio.src = `songs/${songPath}`;
    audio.play().catch(error => console.error("Error playing audio:", error));
    isPlaying = true;
    document.querySelector('a').textContent = 'Pause';
    audio.addEventListener('timeupdate', updateSeekbar);
}

function updateSeekbar() {
    const seekbar = document.getElementById('seekbar');
    seekbar.textContent = '|'.repeat((audio.currentTime / audio.duration) * 50);
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        document.querySelector('a').textContent = 'Play';
    } else {
        audio.play();
        document.querySelector('a').textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function goBack() {
    if (currentView === 'album') {
        openPlaylist();
    } else if (currentView === 'playlist') {
        updateContent(createFolderElement('[Playlist]', "openPlaylist()"));
        toggleBackButton(false);
        currentView = 'main';
    }
}

function toggleBackButton(show) {
    const backButton = document.getElementById('backButton');
    backButton.style.display = show ? 'inline' : 'none';
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        window.location.href = 'index.html';
    }
});

function adjustVolume(change) {
    audio.volume = Math.min(1, Math.max(0, audio.volume + change));
    console.log("Volume:", audio.volume);
}

function increaseVolume() {
    adjustVolume(0.1);
}

function decreaseVolume() {
    adjustVolume(-0.1);
}

function setVolume(value) {
    audio.volume = value;
}
