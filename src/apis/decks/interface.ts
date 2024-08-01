import { CardOutput } from "../cards/interface";

export class CreateDeckInput {
  title: string = "";
  gameId: string = "";
  createdBy: string = "";
  description: string = "";
  cards: DeckCardInput[] = [];

  static empty(): CreateDeckInput {
    return new CreateDeckInput();
  }
}

export interface DeckCardInput {
  cardId: string;
  quantity: number;
  notes?: string;
}

export interface DeckOutput {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  cards: DeckCardOutput[];
}

export interface DeckCardOutput {
  cardId: string;
  quantity: number;
  notes?: string;
  details: Record<string, object>;
}
