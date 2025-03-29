export default function RaceCard({ race }: { race: App.Data.RaceData }) {
    return (
        <div className="race-card">
            <h2>{race.id}</h2>
            <p>{race.status}</p>
        </div>
    );
}
