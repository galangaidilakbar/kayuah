import EventHero from '@/components/event-hero';
import RaceContainer from '@/components/race-container';
import GuestLayout from '@/layouts/guest-layout';
import { Head, usePage } from '@inertiajs/react';
import EventContainer from '../components/event-container';

export default function Page() {
    const { currentEvent, events, races } = usePage<{
        currentEvent: App.Data.EventData;
        events: App.Data.EventData[];
        races: App.Data.RaceData[];
    }>().props;

    return (
        <GuestLayout>
            <Head title="Welcome"></Head>

            <EventHero event={currentEvent} />

            <EventContainer events={events} title="Event Pacu Jalur 2025" />

            <RaceContainer races={races} />
        </GuestLayout>
    );
}
