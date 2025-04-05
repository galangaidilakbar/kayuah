import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

interface ShowProps {
    event: App.Data.EventData;
}

const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
};

export default function Show({ event }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: route('events.index'),
        },
        {
            title: event.name,
            href: route('events.show', event.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1>{event.name}</h1>
                    <div>
                        {event.venue?.name}, {event.venue?.subDistrict?.name}
                    </div>
                    <div>
                        {formatDate(event.start_date)} - {formatDate(event.end_date)}
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="days" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="days">Hari</TabsTrigger>
                            <TabsTrigger value="participants">Peserta</TabsTrigger>
                            <TabsTrigger value="standings">Peringkat</TabsTrigger>
                        </TabsList>
                        <TabsContent value="days">List hari beserta ronde.</TabsContent>
                        <TabsContent value="participants">table jalur-jalur yang ikut.</TabsContent>
                        <TabsContent value="standings">Tabel jalur-jalur yang juara.</TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
