//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace rps {
    /**
     * Inicia un joc de pedra, paper, tisores
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc" weight=1
    export function start(): void {
        let hand: number = 0;
        let cpuHand: number;
        let wins: number = 0;
        let loses: number = 0;
        let draws: number = 0;
        let realWins: number = 0;
        let turn: boolean = true;
        basic.forever(() => {
            if (!(wins + loses == 5) && turn) {
                getHand(hand);
            }
            if (wins + loses == 5) {
                basic.clearScreen();
                basic.pause(500);
                if (wins > loses) {
                    basic.showString("YOU WON!", 100);
                } else {
                    basic.showString("YOU LOST!", 100)
                }
                basic.clearScreen();
                basic.pause(500);
                basic.showString(`W: ${realWins}  D: ${draws}  L: ${loses}`, 100);
                wins = 0;
                loses = 0;
                draws = 0;
                realWins = 0;
            }
        });
        input.onButtonPressed(Button.A, () => {
            if (!(wins + loses == 5)) {
                if (hand < 2) {
                    hand++;
                } else {
                    hand = 0;
                }
            }
        });
        input.onButtonPressed(Button.B, () => {
            if (!(wins + loses == 5)) {
                turn = false;
                cpuHand = randint(0, 2);
                music.play(music.stringPlayable("C D E F", 120), music.PlaybackMode.UntilDone);
                getHand(cpuHand);
                basic.pause(700)
                if (hand == 0) {
                    getWin(() => {
                        basic.showLeds(`
                            . . . . .
                            . # . # .
                            . . . . .
                            # # # # #
                            . . . . .
                        `);
                        wins++;
                        draws++;
                    }, () => {
                        basic.showIcon(IconNames.Sad);
                        loses++;
                    }, () => {
                        basic.showIcon(IconNames.Happy);
                        wins++;
                        realWins++;
                    });
                } else if (hand == 1) {
                    getWin(() => {
                        basic.showIcon(IconNames.Happy);
                        wins++;
                        realWins++;
                    }, () => {
                        basic.showLeds(`
                            . . . . .
                            . # . # .
                            . . . . .
                            # # # # #
                            . . . . .
                        `);
                        wins++;
                        draws++;
                    }, () => {
                        basic.showIcon(IconNames.Sad);
                        loses++;
                    });
                } else {
                    getWin(() => {
                        basic.showIcon(IconNames.Sad);
                        loses++;
                    }, () => {
                        basic.showIcon(IconNames.Happy);
                        wins++;
                        realWins++;
                    }, () => {
                        basic.showLeds(`
                            . . . . .
                            . # . # .
                            . . . . .
                            # # # # #
                            . . . . .
                        `);
                        wins++;
                        draws++;
                    });
                }
                turn = true;
            }
        });
        function getHand(h: number): void {
            if (h == 0) {
                basic.showLeds(`
                    . . . . .
                    . # # # .
                    . # # # .
                    . # # # .
                    . . . . .
                `);
            } else if (h == 1) {
                basic.showLeds(`
                    . # # # .
                    . # # # .
                    . # # # .
                    . # # # .
                    . # # # .
            `);
            } else {
                basic.showIcon(IconNames.Scissors);
            }
        }
        function getWin(rock: () => void, paper: () => void, scissors: () => void): void {
            if (cpuHand == 0) {
                rock();
            } else if (cpuHand == 1) {
                paper();
            } else {
                scissors();
            }
        }

    }
}
