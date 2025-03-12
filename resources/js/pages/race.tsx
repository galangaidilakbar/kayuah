import { useEffect, useState } from 'react';
import echo from '../echo';

function RowRaceStyle({ name, id, winner }: any) {
    if (!winner) {
        return <td className="text-gray-500">{name}</td>;
    }

    if (winner === id) {
        return <td className="text-green-500">{name}</td>;
    }

    return <td className="text-red-500">{name}</td>;
}

export default function Race({ races }: any) {
    const [items, setItems] = useState(races);

    console.log(items);

    useEffect(() => {
        const channel = echo.channel('race');

        channel.listen('RaceWinnerSelected', (data: any) => {
            console.log(data);
            // Assuming data contains the race ID and the winner ID
            const { id, winner_id } = data.race;

            setItems((prevItems: any) => prevItems.map((race: any) => (race.id === id ? { ...race, winner_id: winner_id } : race)));
        });

        // Cleanup on component unmount
        return () => {
            channel.stopListening('RaceWinnerSelected');
        };
    }, []);

    return (
        <div className="p-8">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Left Lane</th>
                        <th>Right Lane</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((race: any) => (
                        <tr key={race.id}>
                            <td>{race.number}</td>
                            <RowRaceStyle name={race.left_lane_participant.title} id={race.left_lane_participant_id} winner={race.winner_id} />
                            <RowRaceStyle
                                name={race.right_lane_participant ? race.right_lane_participant.title : '---'}
                                id={race.right_lane_participant_id}
                                winner={race.winner_id}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
