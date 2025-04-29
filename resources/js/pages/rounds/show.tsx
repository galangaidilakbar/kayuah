import RaceCard from '@/components/race-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';

interface ShowProps {
    round: App.Data.RoundData;
    races: PaginatedData<App.Data.RaceData>;
}

export default function Show({ round, races }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: route('events.index')
        },
        {
            title: round.day?.event?.name || 'Event Detail',
            href: route('events.show', round.day?.event_id)
        },
        {
            title: round.day?.name + ' - ' + round.name,
            href: route('rounds.show', round.id)
        }
    ];

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {round.name}

                {races.data.map((race) => (
                    <RaceCard key={race.id} race={race} />
                ))}
            </div>
        </AppLayout>
    );
}
