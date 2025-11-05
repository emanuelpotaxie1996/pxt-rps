//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace pps {
    /**
     * Inicia un joc de pedra, paper, tisores
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc"
    export function start(): void {
        let hand: number = 0;
        let cpu: number = 0;
        let wins: number = 0;
        let loses: number = 0;
        let draws: number = 0;
        let turn: boolean = true;
        function show(h: number): void {
            if (h === 0) {
                basic.showLeds(".....\n.###.\n.###.\n.###.\n.....");
            } else if (h === 1) {
                basic.showLeds(".###.\n.###.\n.###.\n.###.\n.###.");
            } else {
                basic.showIcon(IconNames.Scissors);
            }
        }
        input.onButtonPressed(Button.A, (): void => {
            if (turn && !(wins + loses + draws === 6)) {
                if (hand < 2) {
                    hand++;
                } else {
                    hand = 0;
                }
            }
        });
        input.onButtonPressed(Button.B, (): void => {
            if (!(wins + loses + draws === 6)) {
                turn = false;
                music.play(music.stringPlayable("c D E F", 120), music.PlaybackMode.UntilDone);
                show(cpu);
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
            if (turn && !(wins + loses + draws === 6)) {
                show(hand);
            }
            if (wins + loses + draws === 6) {
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
