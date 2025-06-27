let currentSong = '';
let isPlaying = false;
let currentIcon = null;

async function playFromDeezer(div, song) {
  const audio = document.getElementById('tracks');
  const thisIcon = div.querySelector('.a1 img');

  if (!thisIcon) {
    console.warn('Icon not found inside clicked block');
    return;
  }

  if (currentSong === song && isPlaying) {
    audio.pause();
    isPlaying = false;
    thisIcon.src = 'img/play.svg';
    return;
  }

  const proxyUrl = 'https://corsproxy.io/?';
  const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(song)}`;
  const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
  const data = await response.json();
  const track = data.data.find(t => t.preview);

  if (track && track.preview) {
    audio.src = track.preview;
    audio.play();

    document.querySelectorAll('.a1 img').forEach(img => img.src = 'img/play.svg');
    thisIcon.src = 'img/pause.svg';

    currentSong = song;
    currentIcon = thisIcon;
    isPlaying = true;

    audio.onended = () => {
      thisIcon.src = 'img/play.svg';
      isPlaying = false;
    };
  } else {
    alert(`Preview not available for "${song}"`);
  }
}
