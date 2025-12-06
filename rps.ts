/**
 * Hands type
 */
enum Hands {
    //% block="rock"
    Rock,
    //% block="paper"
    Paper,
    //% block="scissors"
    Scissors
}

//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace rps {
    /**
     * Starts a rock paper scissors game against CPU.
     * Rock beats scissors, paper beats rock and scissors beat paper.
     * To select a hand, press button A.
     * To accept a hand, shake your micro:bit
     */
    //% block="iniciar joc" weight=2
    export function start(): void {
        let hand: Hands = Hands.Rock;
        let cpu: Hands;
        let wins: number = 0;
        let losses: number = 0;
        let draws: number = 0;
        let turn: boolean = true;
        input.onButtonPressed(Button.A, (): void => {
            if (turn && !(wins + losses + draws === 6)) {
                hand = (hand + 1) % 3;
            }
        });
        input.onGesture(Gesture.Shake, (): void => {
            if (!(wins + losses + draws === 6)) {
                turn = false;
                cpu = randint(0, 2);
                music.play(music.stringPlayable("c D E F", 120), music.PlaybackMode.UntilDone);
                rps.showHand(cpu);
                if (hand === cpu) {
                    basic.showLeds(".....\n.#.#.\n.....\n#####\n.....");
                    draws++;
                } else if ((hand + 1) % 3 === cpu) {
                    basic.showIcon(IconNames.Sad);
                    losses++;
                } else {
                    basic.showIcon(IconNames.Happy);
                    wins++;
                }
                turn = true;
            }
        });
        while (true) {
            if (turn && !(wins + losses + draws === 6)) {
                ppt.showHand(hand);
            }
            if (wins + losses + draws === 6) {
                if (wins >= losses || draws >= losses) {
                    basic.showString("YOU WON!", 100);
                } else {
                    basic.showString("YOU LOST!", 100);
                }
                basic.showString(`W: ${wins}  L: ${losses}  D: ${draws}`);
                wins = 0;
                losses = 0;
                draws = 0;
            }
        }
    }
    /**
     * Starts a rock paper scissors game against another micro:bit.
     * Rock beats scissors, paper beats rock and scissors beat paper.
     * To select a hand, press button A.
     * To accept a hand, shake your micro:bit
     */
    //% block="start radio game" weight=1
    export function startRadio(): void {
        let hand: Hands = Hands.Rock;
        let turn: boolean = true;
        let othHand: Hands;
        let othTurn: boolean;
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                hand = (hand + 1) % 3;
            }
        });
        input.onGesture(Gesture.Shake, (): void => {
            turn = false;
            radio.sendNumber(hand);
        });
        radio.onReceivedNumber((receivedNumber: number): void => {
            othHand = receivedNumber;
            othTurn = false;
        });
        basic.forever(() => {
            if (turn) {
                ppt.showHand(hand);
            } else if (!(turn || othTurn)) {
                music.play(music.stringPlayable("c D E F", 120), music.PlaybackMode.UntilDone);
                rps.showHand(othHand);
                turn = false;
                if (hand === othHand) {
                    basic.showLeds(".....\n.#.#.\n.....\n#####\n.....");
                } else if ((hand + 1) % 3 === othHand) {
                    basic.showIcon(IconNames.Sad);
                } else {
                    basic.showIcon(IconNames.Happy);
                }
                turn = true;
                othTurn = true;
            }
        });
    }
    /**
     * Shows a hand icon, which may be a rock, a paper or scissors
     * @param hand hand to show
     */
    //% block="mostrar mà de %hand" weight=0
    export function showHand(hand: Hands): void {
        if (hand === Hands.Rock) {
            basic.showLeds(".....\n.###.\n.###.\n.###.\n.....");
        } else if (hand == Hands.Paper) {
            basic.showLeds(".###.\n.###.\n.###.\n.###.\n.###.");
        } else {
            basic.showIcon(IconNames.Scissors);
        }
    }
}
