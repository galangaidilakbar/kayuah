import { Head, usePage } from "@inertiajs/react"
import EventCard from "./events/EventCard";

export default function Page() {
    const { props } = usePage<{ events: App.Data.EventData[] }>();
    const { events } = props;
    return (
        <>
            <Head title="Welcome"></Head>
            <main>
                <div className="container mx-auto">
                    <EventCard></EventCard>
                </div>
            </main>
        </>
    )
}
