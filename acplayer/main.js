var vol = 1;
var interval = 100; //ms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

musicPath = '';
var music = new Audio(musicPath);
var bell = new Audio('resources/music/bell.mp3');
function parseHour(_hour) {
  if (_hour>12) {
    _hour-=12
    return String(_hour)+"pm";
  } else {
    return String(_hour)+"am";
  }
}
async function start(soundtrack) {
  hour = new Date().getHours();
  phour = hour
  musicPath = 'resources/music/'+soundtrack+'/'+parseHour(hour)+'.mp3';
  music = new Audio(musicPath);
  music.loop = true;
  music.autoplay = true;
  music.play();

  for(;;) {
    phour = hour; // Previous hour
    hour = new Date().getHours();
    console.log("h:"+hour+" | ph:"+phour);
    if (hour!=phour) {
      while (vol>=0) { // Fadeout (vol must be a multiple of 0.05)
        vol -= 0.01
        music.volume = Math.max(vol,0);
        await sleep(interval);
      }
      await sleep(1500);
      music.pause();
      bell.play();
      await sleep(Math.ceil(bell.duration*1000)); // Wait until bell has stopped playing
      await sleep(1500);
      vol = 1;
      musicPath = 'resources/music/'+soundtrack+'/'+parseHour(hour)+'.mp3';
      music = new Audio(musicPath);
      music.loop = true;
      music.autoplay = true;
      music.play();
      
    }
    await sleep(1000);
  }
}