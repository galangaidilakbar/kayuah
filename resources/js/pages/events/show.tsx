interface ShowProps {
    event: App.Data.EventData;
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/dashboard',
    },
];

export default function Show({ event }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>{event.name}</h1>
            </div>
        </AppLayout>
    );
}
