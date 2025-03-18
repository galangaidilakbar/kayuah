import { Head, usePage } from '@inertiajs/react';
import CardContainer from './events/EventContainer';

export default function Page() {
    const { props } = usePage<{ events: App.Data.EventData[] }>();
    const { events } = props;
    return (
        <>
            <Head title="Welcome"></Head>
            <main>
                <div className="container mx-auto p-8">
                    <CardContainer events={events} />
                </div>
            </main>
        </>
    );
}
