import * as _ from 'lodash';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

function checkLocal() {
  return localStorage.getItem(CURRENT_TIME) === null
    ? 0
    : localStorage.getItem(CURRENT_TIME);
}
checkLocal();

player.setCurrentTime(checkLocal());

const saveSett = player.on(
  'timeupdate',
  _.throttle(el => {
    console.log(el.seconds);
    localStorage.setItem(CURRENT_TIME, el.seconds);
  }, 1000)
);
