import { Head, usePage } from '@inertiajs/react';

export default function Events() {
    const { props } = usePage<{ events: App.Data.EventData[] }>();
    const { events } = props;

    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(date);
    };

    return (
        <div className="space-y-6 p-8">
            <Head title="Events" />
            <h1 className="text-2xl font-bold">Events</h1>
            <div>
                <ul className="space-y-6">
                    {events.map((event) => (
                        <li key={event.id}>
                            <div className="text-xl">{event.name}</div>
                            <div className="text-sm">Start: {formatDate(event.start_date)}</div>
                            <div className="text-sm">End: {formatDate(event.end_date)}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
