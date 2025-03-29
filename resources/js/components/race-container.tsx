import RaceCard from './race-card';

interface RaceContainerProps {
    races: App.Data.RaceData[];
    title?: string;
    description?: string;
}

export default function RaceContainer({ races, title = 'Race Results', description }: RaceContainerProps) {
    return (
        <div className="container mx-auto space-y-6 px-4 py-8 md:px-6">
            <h1 className="text-3xl font-bold">{title}</h1>

            {description && <p className="text-lg">{description}</p>}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {races.map((race) => (
                    <RaceCard race={race} key={race.id} />
                ))}
            </div>
        </div>
    );
}
