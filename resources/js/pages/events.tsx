import { Head, usePage } from '@inertiajs/react';

export default function Events() {
    const { props } = usePage<{ events: App.Data.EventData[] }>();

    const { events } = props;

    return (
        <div className="space-y-6 p-8">
            <Head title="Districts" />

            <h1 className="text-2xl font-bold">Events</h1>

            <div>
                <ul className="space-y-6">
                    {events.map((event) => (
                        <li key={event.id}>
                            <div className="text-xl">{event.name}</div>
                            <div className="text-sm">{event.start_date}</div>
                            <div className="text-sm">{event.end_date}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
