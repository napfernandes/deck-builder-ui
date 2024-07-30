// import { GameOutput } from "@/apis/cards/interface";
// import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

// interface GameContextState {
//   game: GameOutput;
//   setGame:  Dispatch<SetStateAction<GameOutput>>;
// }
// export const GameContext = createContext<GameContextState>({
//   game: GameOutput.empty(),
//   setGame: () => {},
// });

// interface GameProviderProps {
//   children: React.ReactNode;
// }

// export const GameProvider = ({
//   children,
// }: GameProviderProps): React.ReactElement => {
//   const [game, setGame] = useState<GameOutput>(GameOutput.empty());

//   return (
//     <GameContext.Provider value={{ game, setGame }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export const useGame = (): GameContextState =>
//   useContext(GameContext);
