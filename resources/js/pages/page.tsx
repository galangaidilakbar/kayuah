import EventHero from '@/components/event-hero';
import { Head, usePage } from '@inertiajs/react';
import EventContainer from './events/EventContainer';
import { EventCarousel } from '@/components/event-carousel';

export default function Page() {
    const { props } = usePage<{ currentEvent: App.Data.EventData; events: App.Data.EventData[] }>();
    const { currentEvent, events } = props;
    return (
        <>
            <Head title="Welcome"></Head>

            <main>
                <EventHero event={currentEvent} />

                <EventCarousel />

                <EventContainer events={events} />
            </main>
        </>
    );
}
