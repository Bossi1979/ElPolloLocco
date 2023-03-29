let canvas;
let world;
let keyboard = new Keyboard();
let aLevel = 1;
let pause = false;
let soundOn = true;
let gameRuns = false;
let fullscreenActiv = false;
let mobile = false;

let keysArray = [
    {
        'keyId': 'ArrowLeft',
        'keyFunc': 'LEFT',
        'value': false,
    },
    {
        'keyId': 'ArrowRight',
        'keyFunc': 'RIGHT',
        'value': false,
    },
    {
        'keyId': 'ArrowUp',
        'keyFunc': 'UP',
        'value': false,
    },
    {
        'keyId': 'ArrowDown',
        'keyFunc': 'DOWN',
        'value': false,
    },
    {
        'keyId': 'Space',
        'keyFunc': 'SPACE',
        'value': false,
    },
    {
        'keyId': 'Space',
        'keyFunc': 'SPACE',
        'value': false,
    },

]

let levelArray = [
    initLevel1(),
    initLevel2(),
]


setTimeout(() => {
    keyboard.bindTouchStartEvents();
    keyboard.bindTouchEndEvents();
    keyboard.bindTouchEventUpperBtn();
}, 1000);


/**
 * Initializes the canvas and creates a new instance of the World class.
 */
async function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Asynchronously starts the game by setting the level, delaying the initiation
 * of the game by 1 second, and adjusting the CSS settings.
 */
async function startGame() {
    await setLevel();
    setTimeout(init, 1000);
    cssSettingsGameStart();
    gameRuns = true;
    // keyboard.bindTouchEndEventsUpperButtons();
}


/**
 * Sets the CSS settings when the game starts.
 */
function cssSettingsGameStart() {
    if (!soundOn) showSoundBtnOn();
    showCanvas();
    if (mobile) showLwrBtnRow();
}


/**
 * Displays the sound button as "on".
 */
function showSoundBtnOn() {
    document.getElementById('btnSoundsOn').classList.add('d-none');
    document.getElementById('btnSoundsOff').classList.remove('d-none');
}


/**
 * Displays the canvas and upper button row and hides the start screen.
 */
function showCanvas() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('upperBtn').classList.remove('d-none');
}


/**
 * Displays the lower button row.
 */
function showLwrBtnRow() {
    document.getElementById('lwrBtn').classList.remove('d-none');
}


/**
 * Sets the level based on the value of the aLevel variable and initializes the corresponding level.
 */
async function setLevel() {
    if (aLevel == 1) await initLevel1();
    else if (aLevel == 2) await initLevel2();
    else if (aLevel >= 3) await initLevel3();
}


/**
 * Stops the game, hides the canvas, and displays the start screen.
 */
function exitGame() {
    showPauseBtn();
    stopCanvas();
    showStartScreen();
    gameRuns = false;
}


/**
 * Displays the pause button and sets the pause flag to false.
 */
function showPauseBtn() {
    document.getElementById('btnPause').classList.remove('d-none');
    document.getElementById('btnResume').classList.add('d-none');
    pause = false;
}


/**
 * Stops the canvas by stopping all sounds, intervals, and animations.
 */
function stopCanvas() {
    stopAllSounds();
    stopAllIntervals();
    world.stopAnimation();
}


/**
 * Displays the start screen and hides the canvas and buttons.
 */
function showStartScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('lwrBtn').classList.add('d-none');
    document.getElementById('upperBtn').classList.add('d-none');
}


/**
 * Stops all the intervals that were set using the setInterval() method.
 */
function stopAllIntervals() {
    intervalIds.forEach(interval => {
        clearInterval(interval);
    });
}


/**
 * This function turns off all sounds in the game by muting
 * the audio elements. It also updates the soundOn variable 
 * to false and toggles the visibility of the mute/unmute buttons.
 */
function soundsOff() {
    allSoundsIds.forEach(sound => {
        sound.muted = true;
    });
    soundOn = false;
    showSoundBtnOff();
}


/**
 * Displays the sound button as "off".
 */
function showSoundBtnOff() {
    document.getElementById('btnSoundsOff').classList.add('d-none');
    document.getElementById('btnSoundsOn').classList.remove('d-none');
}


/**
 * The soundsOn() function unmuting all sounds and set the soundOn variable 
 * to true and toggles the visibility of the mute/unmute buttons.
 */
function soundsOn() {
    allSoundsIds.forEach(sound => {
        sound.muted = false;
    });
    soundOn = true;
    showSoundBtnOn();
}


/**
 * Pauses all sound objects in the game.
 */
function stopAllSounds() {
    allSoundsIds.forEach(sound => {
        sound.pause();
    });
}


/**
 * Pauses the game and sets the cloud speed.
 * Show the pause button and hide the resume button.
 * Set the pause flag to true.
 */
async function pauseGame() {
    pause = true;
    setCloudSpeed();
    document.getElementById('btnPause').classList.add('d-none');
    document.getElementById('btnResume').classList.remove('d-none');
}


/**
 * Resumes the game after it has been paused.
 * Show the resume button and hide the pause button.
 * Set the pause flag to false.
 */
async function resumeGame() {
    showPauseBtn();
    setCloudSpeed();
    world.character.time = new Date() / 1000;
    world.draw();
}


/**
 * Sets the speed of clouds in the game's world. If the game is not paused.
 */
function setCloudSpeed() {
    if (!pause) {
        world.level.clouds.forEach(cloud => {
            cloud.speed = 0.05;
        });
    }
}


/**
 * This code adds an event listener to the window object, 
 * which is triggered when the window has finished loading.
 * and call the viewportMobile() function in this case.
 */
window.onload = function () {
    viewportMobile();
}


/**
 * This code sets an event listener on the window object for the "resize" event.
 * And call the function viewportMobil() in this case. 
 */
window.onresize = function () {
    viewportMobile();
}


/**
 * This function checks if the device is a mobile and adjusts the view accordingly.
 */
function viewportMobile() {
    requestAnimationFrame(() => {
        if (/Mobil/.test(navigator.userAgent)) startMobilView();
        else startDesktopView();
    });
}


/**
 * Set the desktop view settings for the game.
 */
function startDesktopView() {
    generalCssDesktopSettings();
    if (!gameRuns) gameNotRunDesktopCssSettings();
    if (gameRuns) gameRunDesktopCssSettings();
}


/**
 * Set the desktop general view settings for the game.
 */
function generalCssDesktopSettings() {
    mobile = false;
    document.getElementById('keyDescription').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('mobilView');
    document.getElementById('lwrBtn').classList.add('d-none');
}


/**
 * This function applies necessary CSS settings to the page when not running the game on a desktop device.
 */
function gameNotRunDesktopCssSettings() {
    document.getElementById('turnYourDevive').classList.add('d-none');
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('upperBtn').classList.add('d-none');
    document.getElementById('lwrBtn').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
}


/**
 * This function applies necessary CSS settings to the page when running the game on a desktop device.
 */
function gameRunDesktopCssSettings() {
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('upperBtn').classList.remove('d-none');
    document.getElementById('turnYourDevive').classList.add('d-none');
    if (fullscreenActiv){
        document.getElementById('btnFull').classList.add('d-none');
        document.getElementById('btnFullEnd').classList.remove('d-none');
    }else{
        document.getElementById('btnFull').classList.remove('d-none');
        document.getElementById('btnFullEnd').classList.add('d-none');
    }
}


/**
 * This function selects an element with ID "fullscreen" from the document and enters it into
 * fullscreen mode. 
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


/**
 * This function enters the specified element into fullscreen mode using various vendor-
 * specific methods. It also sets a boolean flag fullscreenActiv to true.
 * @param {HTMLElement} element - The element to enter into fullscreen mode.
 */
async function enterFullscreen(element) {
    fullscreenActiv = true;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    fullscreenCssSettings();
}


/**
 * This function applies necessary CSS settings to the page when entering fullscreen mode.
 */
function fullscreenCssSettings() {
    document.getElementById('btnFull').classList.add('d-none');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('btnFullEnd').classList.remove('d-none');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('canvas').classList.add('fullWindow');
}


/**
 * This function exits fullscreen mode using various vendor-specific methods and sets the fullscreenActiv flag to false.
 */
function exitShownFullscreen() {
    fullscreenActiv = false;
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    exitFullscreenCssSettings();
}


/**
 * This function applies necessary CSS settings to the page when exiting fullscreen mode.
 */
function exitFullscreenCssSettings() {
    document.getElementById('btnFull').classList.remove('d-none');
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('btnFullEnd').classList.add('d-none');
    document.getElementById('canvas').classList.remove('fullWindow');
}









