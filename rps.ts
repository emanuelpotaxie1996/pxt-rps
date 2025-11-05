//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace rps {
    export enum Hands {
        //% block="Pedra"
        Rock = ".....\n.###.\n.###.\n.###\n.....",
        Paper = ".###.\n.###.\n.###.\n.###.\n.###.",
        //% block="Tisores"
        Scissors = "##..#\n##.#.\n..#..\n##.#.\n##..#"
    }
    /**
     * Mostra una mà, que pot ser una pedra, un paper o unes tisores
     * @param hand mà a mostrar
     */  
    //% block="mostrar mà de %hand" weight=0
    export function showHand(hand: Hands): void {
        basic.showLeds(hand)
    }
    /**
     * Inicia un joc de pedra, paper, tisores
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc" weight=1
    export function start(): void {
        let hand: Hands = Hands.Rock;
        let cpu: Hands;
        let wins: number = 0;
        let loses: number = 0;
        let realWins: number = 0;
        let draws: number = 0;
        basic.forever(() => {
            if (turn && !(wins + loses === 6)) {
                showHand(hand);
            }
            if (wins + loses === 6) {
                basic.clearScreen();
                basic.pause(500);
                if (wins >= loses) {
                    basic.showString("HAS GUANYAT!", 100);
                } else {
                    basic.showString("HAS PERDUT!", 100);
                }
                basic.clearScreen();
                basic.pause(500);
                basic.showString(`V: ${realWins}  D: ${loses}  E: ${draws}`, 100);
                wins = 0;
                loses = 0;
                realWins = 0;
                draws = 0;
            }
        });
        input.onButtonPressed(Button.A, () => {
            if (turn && !(wins + loses === 6)) {
                if (hand === Hands.Rock) {
                    hand = Hands.Paper;
                } else if (hand === Hands.Paper) {
                    hand = Hands.Scissors;
                } else {
                    hand = Hands.Rock;
                }
            }
        });
        input.onButtonPressed(Button.B, () => {  
            if (!(wins + loses === 6)) {
                turn = false;  
            cpu = Object.values(Hands)[randint(0, 2];  
            music.play(music.stringPlayable("C D E F", 120), music.PlaybackMode.UntilDone);  
            basic.pause(700);  
            showHand(cpu);  
            if (hand === Hands.Rock) {  
                getWin(() => {  
                    drawFace();  
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
            } else if (hand === Hands.Paper) {  
                getWin(() => {  
                    basic.showIcon(IconNames.Happy);  
                    wins++;  
                    realWins++;  
                }, () => {  
                    drawFace();  
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
                    drawFace();  
                    draws++;  
                });  
            }  
            turn = true;
            }
        });  
        function getWin(rock: () => void, paper: () => void, scissors: () => void): void {  
            if (cpu === Hands.Rock) {  
                rock();  
            } else if (cpu === Hands.Paper) {  
                paper();  
            } else {  
                scissors();  
            }  
        }  
        function drawFace(): void {  
            basic.showLeds(`  
                . . . . .  
                . # . # .  
                . . . . .  
                # # # # #  
                . . . . .  
            `);  
        }  
    }  
}  
