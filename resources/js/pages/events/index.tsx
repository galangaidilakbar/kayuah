import EventContainer from '@/components/event-container';
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

            <EventContainer events={events} />
        </AppLayout>
    );
}
