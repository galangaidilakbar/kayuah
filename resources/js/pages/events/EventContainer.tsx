import EventCard from './EventCard';

export default function CardContainer({ events }: { events: App.Data.EventData[] }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Latest events</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <EventCard event={event} key={event.id} />
                ))}
            </div>
        </div>
    );
}
