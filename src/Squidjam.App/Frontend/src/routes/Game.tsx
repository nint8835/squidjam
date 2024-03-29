import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Player from '../components/Player';
import { usePerformAction } from '../queries/api/squidjamComponents';
import { useStore } from '../store';
import { stateFormatters } from '../util';

export default function GamePage() {
    const { currentGame, playerId: currentPlayer } = useStore();
    //@ts-ignore
    const { mutateAsync: performAction } = usePerformAction({ onError: (err) => toast.error(err.stack) });

    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between bg-zinc-800 p-2">
                <div className="flex-1"></div>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl">{currentGame.id}</h1>
                    <div className="italic text-zinc-500">{stateFormatters[currentGame.state.type](currentGame)}</div>
                </div>
                <div className="flex-1 text-right">
                    <button
                        className="rounded-md border-[1px] border-zinc-500 p-2 text-zinc-500 transition-all hover:border-red-700 hover:bg-red-600 hover:text-white"
                        onClick={async () => {
                            if (currentGame.state.type !== 'Ended') {
                                await performAction({
                                    pathParams: { gameId: currentGame.id },
                                    body: { type: 'RemovePlayer', player: currentPlayer },
                                });
                            }

                            navigate('/');
                        }}
                    >
                        {currentGame.state.type === 'Ended' ? 'Back To Game List' : 'Leave Game'}
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {currentGame.players.map((player, playerIndex) =>
                    player.id === currentPlayer ? null : (
                        <Player player={player} playerIndex={playerIndex} key={player.id} />
                    ),
                )}
            </div>

            <Player
                player={currentGame.players.find((player) => player.id === currentPlayer)!}
                playerIndex={currentGame.players.findIndex((player) => player.id === currentPlayer)!}
            />
        </div>
    );
}
