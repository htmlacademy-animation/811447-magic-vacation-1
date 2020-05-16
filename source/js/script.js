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
import TextAnimation from './modules/text-animation';

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

const animationIntroTitle = new TextAnimation(`.intro__title`, `active`);
setTimeout(()=>{
  animationIntroTitle.runAnimation();
}, 500);

const animationIntroDate = new TextAnimation(`.intro__date`, `active`);
setTimeout(()=>{
  animationIntroDate.runAnimation();
}, 1800);

