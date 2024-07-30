export class CardOutput {
    id: string = '';
    language: string = '';
    attributes: { [key: string]: any } = {};

    static empty() {
        return new CardOutput();
    }
}

export class GameOutput {
    id: string = '';
    name: string = '';
    description: string = '';
    numberOfCards: number = 0;

    static empty() {
        return new GameOutput();
    }
}
