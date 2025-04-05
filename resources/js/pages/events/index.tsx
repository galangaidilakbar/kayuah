import EventCard from '@/components/event-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
];

interface IndexProps {
    events: App.Data.EventData[];
}

export default function Index({ events }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {events.map((event) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
