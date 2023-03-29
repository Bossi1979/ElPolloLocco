class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    DKEY = false;


    constructor() {
        this.bindKeyDownEvents();
        this.bindKeyUpEvents();
    }


    bindKeyDownEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) keyboard.LEFT = true;
            if (e.keyCode == 39) keyboard.RIGHT = true;
            if (e.keyCode == 38) keyboard.UP = true;
            if (e.keyCode == 40) keyboard.DOWN = true;
            if (e.keyCode == 32) keyboard.SPACE = true;
            if (e.keyCode == 68) keyboard.DKEY = true;
        })
    }


    bindKeyUpEvents() {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 37) keyboard.LEFT = false;
            if (e.keyCode == 39) keyboard.RIGHT = false;
            if (e.keyCode == 38) keyboard.UP = false;
            if (e.keyCode == 40) keyboard.DOWN = false;
            if (e.keyCode == 32) keyboard.SPACE = false;
            if (e.keyCode == 68) keyboard.DKEY = false;
        })
    }



    /**
     * Adds a touchstart event listener to the window and sets the corresponding
     * value in the keyboard object to true when a button is touched.
     */
    bindTouchStartEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        });
        document.getElementById('btnBottle').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.DKEY = true;
        });
    }


    /**
     * Adds a touchend event listener to the window and sets the corresponding
     * value in the keyboard object to false when a button is touched end. 
     */
    bindTouchEndEvents() {
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
        document.getElementById('btnBottle').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.DKEY = false;
        });
    }


    bindTouchEndEventsUpperButtons() {
        document.getElementById('btnFull').addEventListener('touchend', (e) => {
            e.preventDefault();
            fullscreen();
        });
        document.getElementById('btnFullEnd').addEventListener('touchend', (e) => {
            e.preventDefault();
            exitShownFullscreen();
        });
        document.getElementById('btnSoundsOff').addEventListener('touchend', (e) => {
            e.preventDefault();
            soundsOn();
        });
        document.getElementById('btnPause').addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(pauseGame, 500);
        });
        document.getElementById('btnResume').addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(resumeGame, 500);
        });
        document.getElementById('btnExit').addEventListener('touchend', (e) => {
            e.preventDefault();
            exitGame();
        });

    }


    /**
    * Adds a touchend event listener to the window and sets the corresponding 
    * value in the keyboard object to false when a button is touched end.
    */
    bindTouchEventUpperBtn() {
        window.addEventListener('touchend', (e) => {
            if (e.srcElement.id == 'btnFull') fullscreen();
            if (e.srcElement.id == 'btnFullEnd') exitShownFullscreen();
            if (e.srcElement.id == 'btnSoundsOff') soundsOn();
            if (e.srcElement.id == 'btnPause') setTimeout(pauseGame, 500);
            if (e.srcElement.id == 'btnResume') {
                resumeGame();
                setTimeout(resumeGame, 500);
            }
            if (e.srcElement.id == 'btnExit') exitGame();
        })
    }
}