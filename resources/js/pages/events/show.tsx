interface ShowProps {
    event: App.Data.EventData;
}

export default function Show({ event }: ShowProps) {
    return (
        <div>
            <h1>{event.name}</h1>
        </div>
    );
}
