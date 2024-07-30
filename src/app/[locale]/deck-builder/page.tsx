'use client';

import { Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

import { CardOutput } from '@/apis/cards/interface';
import { CreateDeckInput } from "@/apis/decks/interface";
import { SearchCardsComponent } from '@/components/search-cards';

interface DeckBuilderPageProps {}

export default function DeckBuilderPage(props: DeckBuilderPageProps) {
    const [deck, setDeck] = useState<CreateDeckInput>(CreateDeckInput.empty());
    const [selectedCard, setSelectedCard] = useState<CardOutput>(CardOutput.empty());

    useEffect(() => {
        if (selectedCard.id) {
            const existingCard = deck.cards.find(card => card.cardId === selectedCard.id);
            if (!existingCard) {
                setDeck({ ...deck, cards: [...deck.cards, { cardId: selectedCard.id, quantity: 1, details: selectedCard }] });
            }
        }
    }, [selectedCard]);

    const onRemoveCard = (index: number) => {
        const newCards = [...deck.cards];
        newCards.splice(index, 1);
        setDeck({ ...deck, cards: newCards });
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center">
            <h1>Deck Builder</h1>

            <div className="flex flex-col">
                <div className='flex flex-col'>
                    <h3>General information</h3>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Input type="text" id="title" value={deck.title} onChange={e => setDeck({ ...deck, title: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <Input id="description" value={deck.description} onChange={e => setDeck({ ...deck, description: e.target.value })} />
                    </div>
                </div>
                
                <div className='flex flex-col'>
                    <h3>Cards selection</h3>

                    <SearchCardsComponent setSelectedValue={setSelectedCard} />
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Card title</th>
                                <th>Quantity</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deck.cards.map((card, index) => (
                                <tr key={card.details.id}>
                                    <td>{card.details?.attributes?.cardNumber}</td>
                                    <td>{card.details?.attributes?.name}</td>
                                    <td>
                                        <InputNumber max={4} min={1} defaultValue={card.quantity} /></td>
                                    <td>
                                        <Input.TextArea rows={4} defaultValue={card.notes} />
                                    </td>
                                    <td>
                                        <button onClick={() => onRemoveCard(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
