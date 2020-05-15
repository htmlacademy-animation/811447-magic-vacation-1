// modules
import body from "./modules/body.js";
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import rules from './modules/rules.js';
import FullPageScroll from './modules/full-page-scroll';
import AccentTypographyBuild from './modules/accent-typography-build';

// init modules
body();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const animationTopScreenTextLine = new AccentTypographyBuild(`.text`, 1000, `active`, `transform`);
setTimeout(()=>{
  animationTopScreenTextLine.runAnimation();
}, 500);
