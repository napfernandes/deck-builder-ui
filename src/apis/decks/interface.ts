import { CardOutput } from "../cards/interface";

export class CreateDeckInput {
    title: string = '';
    gameId: string = '';
    createdBy: string = '';
    description: string = '';
    cards: DeckCardInput[] = [];

    static empty(): CreateDeckInput {
        return new CreateDeckInput();
    }
}

export interface DeckCardInput {
    cardId: string;
    quantity: number;
    notes?: string;
    details: CardOutput;
}