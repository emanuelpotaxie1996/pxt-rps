//% block="Pedra, paper, tisores" color=#C247FF
//% weight=102 icon="\uf257"
namespace rps {
    export enum Hands {
        Rock = ".....\n.###.\n.###.\n.###\n.....",
        Paper = ".###.\n.###.\n.###.\n.###.\n.###.",
        Scissors = "##..#\n##.#.\n..#..\n##.#.\n##..#"
    }
    /**
     * Mostra una mà, que pot ser una pedra, un paper o unes tisores
     * @param hand mà a mostrar
     */
    export function showHand(hand: Hands): void {
        basic.showLeds(hand);
    }
    /**
     * Inicia un joc de pedra, paper, tisores
     * Pedra guanya a tisores, paper guanya a pedra i tisores guanyen a paper.
     * Per seleccionar una mà, premi el botó A.
     * Per acceptar la mà seleccionada, premi el botó B.
     */
    //% block="iniciar joc" weight=1
    export function start(): void {
    }
}
