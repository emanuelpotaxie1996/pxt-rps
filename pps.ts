//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace pps {
    export enum Hands {
        //% block="pedra"
        Rock,
        //% block="paper"
        Paper,
        //% block="tisores"
        Scissors
    }
    /**
     * Mostra una icona d'una mà, que pot ser de pedra, paper o tisores
     * @param hand mà a mostrar
     */
    //% block="mostrar mà %hand" weight=1
    export function showHand(hand: pps.Hands): void {
        if (hand === pps.Hands.Rock) {
            basic.showLeds(".....\n.###.\n.###.\n.###.\n.....");
        } else if (hand == pps.Hands.Paper) {
            basic.showLeds(".###.\n.###.\n.###.\n.###.\n.###.");
        } else {
            basic.showIcon(IconNames.Scissors);
        }
    }
    /**
     * Inicia un joc de pedra, paper, tisores contra una altra micro:bit
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc amb ràdio" weight=0 color=#E3008C
    export function startRadio(): void {
        let hand: pps.Hands = pps.Hands.Rock;
        let turn: boolean = true;
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                hand = (hand + 1) % 3;
            }
        });
        input.onButtonPressed(Button.B, (): void => {
            turn = false;
            radio.sendNumber(hand);
        });
        radio.onReceivedNumber((receivedNumber: number): void => {
            while (turn) {}
            music.play(music.stringPlayable("c D E F", 120), music.PlaybackMode.UntilDone);
            pps.showHand(receivedNumber);
            turn = false;
            if (hand === receivedNumber) {
                basic.showLeds(".....\n.#.#.\n.....\n#####\n.....");
            } else if ((hand + 1) % 3 === receivedNumber) {
                basic.showIcon(IconNames.Sad);
            } else {
                basic.showIcon(IconNames.Happy);
            }
            turn = true;
        });
        basic.forever(() => {
            if (turn) {
                pps.showHand(hand);
            }
        });
    }
    /**
     * Inicia un joc de pedra, paper, tisores contra un ordinador
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc" weight=2
    export function start(): void {
        let hand: pps.Hands = pps.Hands.Rock;
        let cpu: pps.Hands;
        let wins: number = 0;
        let loses: number = 0;
        let draws: number = 0;
        let turn: boolean = true;
        function gameOver(): boolean {
            return wins + loses + draws === 6;
        }
        input.onButtonPressed(Button.A, (): void => {
            if (turn && !gameOver()) {
                hand = (hand + 1) % 3;
            }
        });
        input.onButtonPressed(Button.B, (): void => {
            if (!gameOver()) {
                turn = false;
                cpu = randint(0, 2)
                music.play(music.stringPlayable("c D E F", 120), music.PlaybackMode.UntilDone);
                pps.showHand(cpu);
                if (hand === cpu) {
                    basic.showLeds(".....\n.#.#.\n.....\n#####\n.....");
                    draws++;
                } else if ((hand + 1) % 3 === cpu) {
                    basic.showIcon(IconNames.Sad);
                    loses++;
                } else {
                    basic.showIcon(IconNames.Happy);
                    wins++;
                }
                turn = true;
            }
        });
        basic.forever((): void => {
            if (turn && !gameOver()) {
                pps.showHand(hand);
            }
            if (gameOver()) {
                if (wins >= loses || draws >= loses) {
                    basic.showString("HAS GUANYAT!", 100);
                } else {
                    basic.showString("HAS PERDUT", 100);
                }
                wins = 0;
                loses = 0;
                draws = 0;
            }
        });
    }
}
