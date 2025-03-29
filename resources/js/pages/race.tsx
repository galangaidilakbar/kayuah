import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import echo from '../echo';

function RowRaceStyle({ name, id, winner }: { name: string | undefined; id: string | null; winner: string | null }) {
    if (!winner) {
        return <td className="p-2 text-gray-500">{name}</td>;
    }

    if (winner === id) {
        return <td className="animate-pulse p-2 font-bold text-green-500">{name} 🏆</td>;
    }

    return <td className="p-2 text-red-500 line-through">{name}</td>;
}

export default function Race({ races }: { races: App.Data.RaceData[] }) {
    const [items, setItems] = useState(races);

    console.log(items);

    useEffect(() => {
        const channel = echo.channel('race');

        channel.listen('RaceWinnerSelected', (data: { race: App.Data.RaceData }) => {
            console.log(data);
            // Assuming data contains the race ID and the winner ID
            const { id, winner_id } = data.race;

            setItems((prevItems) => prevItems.map((race) => (race.id === id ? { ...race, winner_id: winner_id } : race)));
        });

        // Cleanup on component unmount
        return () => {
            channel.stopListening('RaceWinnerSelected');
        };
    }, []);

    return (
        <div className="p-8">
            <Head title="Race" />
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left font-medium text-gray-600">#</th>
                            <th className="p-3 text-left font-medium text-gray-600">Left Lane</th>
                            <th className="p-3 text-left font-medium text-gray-600">Right Lane</th>
                            <th className="p-3 text-left font-medium text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {items.map((race) => (
                            <tr key={race.id} className="transition-colors hover:bg-gray-50">
                                <td className="p-2 font-medium">{race.number}</td>
                                <RowRaceStyle name={race.left_lane_participant?.title} id={race.left_lane_participant_id} winner={race.winner_id} />
                                <RowRaceStyle
                                    name={race.right_lane_participant?.title || '---'}
                                    id={race.right_lane_participant_id}
                                    winner={race.winner_id}
                                />
                                <td className="p-2">
                                    {race.winner_id ? (
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                                    ) : (
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">In Progress</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No races available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
