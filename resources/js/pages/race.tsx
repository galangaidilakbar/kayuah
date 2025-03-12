import { useEffect } from 'react';
import echo from '../echo';

export default function Race() {
    useEffect(() => {
        const channel = echo.channel('race');

        channel.listen('RaceWinnerSelected', (data: any) => {
            console.log(data);
        });

        // Cleanup on component unmount

        return () => {
            channel.stopListening('RaceWinnerSelected');
        };
    }, []);

    return <div>race</div>;
}
