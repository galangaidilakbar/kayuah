import EventHero from '@/components/event-hero';
import { Head, usePage } from '@inertiajs/react';
import EventContainer from './events/EventContainer';

export default function Page() {
    const { props } = usePage<{ currentEvent: App.Data.EventData; events: App.Data.EventData[] }>();
    const { currentEvent, events } = props;
    return (
        <>
            <Head title="Welcome"></Head>

            <main>
                <EventHero event={currentEvent} />

                <div className="container mx-auto px-4 md:px-6">
                    <EventContainer events={events} />
                </div>
            </main>
        </>
    );
}
