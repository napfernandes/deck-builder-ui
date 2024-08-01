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

export class DeckCardInput {
  cardId: string = "";
  quantity: number = 0;
  notes?: string = "";
  details?: Record<string, any> = {};
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
  details: Record<string, unknown>;
}
