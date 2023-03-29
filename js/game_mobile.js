/**
 * Set the mobile view settings for the game.
 */
function startMobilView() {
    generalMobilCssSettings();
    if (fullscreenActiv) exitShownFullscreen();
    if (checkTabletMode()) tabletModeCssSettings();
    checkMobilOrientation();
}


/**
 * Check the mobile Device is a Tablet.
 * @returns - True if the mobile device is a tablet. Otherwise false.
 */
function checkTabletMode() {
    return innerWidth > 1023;
}


/**
 * Set the mobile tablet CSS for the game.
 */
function tabletModeCssSettings() {
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('btnFull').classList.remove('d-none');
}


/**
 * Set general CSS mobile settings.
 */
function generalMobilCssSettings() {
    mobile = true;
    document.getElementById('lwrBtn').classList.remove('d-none');
    document.getElementById('btnFull').classList.add('d-none');
    document.getElementById('keyDescription').classList.add('d-none');
    document.getElementById('canvas').classList.add('mobilView');
}


/**
 * Check the mobile Orientation and set the applicable CSS settings.
 */
function checkMobilOrientation() {
    if (mobilOrientationIsLandscape()) mobilCssLandscape();
    else mobilCssPortrait();
}


/**
 * Set the mobile css for Landscape view.
 */
function mobilCssLandscape() {
    document.getElementById('turnYourDevive').classList.add('d-none');
    if (!gameRuns) showStartScreen();
    else if (gameRuns && pause) {
        resumeGame();
        showCanvas();
        document.getElementById('lwrBtn').classList.remove('d-none');
    } else if (gameRuns) {
        document.getElementById('lwrBtn').classList.remove('d-none');
        document.getElementById('btnFull').classList.add('d-none');
        document.getElementById('btnFullEnd').classList.add('d-none');
        showCanvas();
    }
}


/**
 * Set the mobile css for Portrait view.
 */
function mobilCssPortrait() {
    if (!gameRuns) gameNotRunPortraitMobilCssSettings();
    if (gameRuns) {
        if (!pause) pauseGame();
        gameRunPortraitMobilCssSettings();
    }
}


/**
 * Set the mobile css for Portrait view, when the game is not running.
 */
function gameNotRunPortraitMobilCssSettings() {
    document.getElementById('turnYourDevive').classList.remove('d-none');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('upperBtn').classList.add('d-none');
    document.getElementById('lwrBtn').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
}


/**
 * Set the mobile css for Portrait view, when the game is running.
 */
function gameRunPortraitMobilCssSettings() {
    document.getElementById('header').classList.add('d-none');
    document.getElementById('upperBtn').classList.add('d-none');
    document.getElementById('lwrBtn').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('turnYourDevive').classList.remove('d-none');
}


/**
 * returns a boolean value indicating whether the orientation of the mobile device
 * is landscape (true) or portrait (false).
 * 
 * @returns - true (landscape) or false (portrait)
 */
function mobilOrientationIsLandscape() {
    return window.innerWidth > window.innerHeight;
}