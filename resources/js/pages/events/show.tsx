import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, MapPin, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import EventOverview from './components/event-overview';
import EventParticipants from './components/event-participants';
import EventSchedule from './components/event-schedule';
import EventStanding from './components/event-standing';

interface ShowProps {
    event: App.Data.EventData;
    participants: PaginatedData<App.Data.ParticipantData>;
    subDistricts: App.Data.SubDistrictData[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function Show({ event, participants, subDistricts }: ShowProps) {
    const [allParticipants, setAllParticipants] = useState(participants);

    const handleNewParticipants = (newParticipants: PaginatedData<App.Data.ParticipantData>) => {
        setAllParticipants((prevParticipants) => {
            // Filter out duplicates based on participant.id
            const existingIds = new Set(prevParticipants.data.map((p) => p.id));
            const uniqueNewData = newParticipants.data.filter((p) => !existingIds.has(p.id));

            return {
                ...newParticipants,
                data: [...prevParticipants.data, ...uniqueNewData],
                next_page_url: newParticipants.next_page_url,
            };
        });
    };

    const handleFilterParticipants = (filteredParticipants: PaginatedData<App.Data.ParticipantData>) => {
        setAllParticipants(filteredParticipants);
    };

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
                {/* Hero Section */}
                <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
                    <img src={event.thumbnail || '/placeholder.svg'} alt={event.name} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h1 className="mb-2 text-2xl font-bold text-white md:text-4xl">{event.name}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-white">
                            <div className="flex items-center gap-1">
                                <CalendarDays className="h-5 w-5" />
                                <span>
                                    {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                <span className="capitalize">
                                    {event.venue?.name.toLowerCase()}, {event.venue?.subDistrict?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="dark:bg-secondary flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                        <div className="rounded-full bg-rose-100 p-3">
                            <CalendarDays className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Durasi</p>
                            <p className="text-xl font-semibold">{event.days_count} Hari</p>
                        </div>
                    </div>
                    <div className="dark:bg-secondary flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                        <div className="rounded-full bg-emerald-100 p-3">
                            <Users className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Peserta</p>
                            <p className="text-xl font-semibold">{event.participants_count} Jalur</p>
                        </div>
                    </div>
                    <div className="dark:bg-secondary flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                        <div className="rounded-full bg-amber-100 p-3">
                            <Trophy className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Jenis</p>
                            <p className="text-xl font-semibold">{event.type}</p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-8 grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                        <TabsTrigger value="schedules">Jadwal</TabsTrigger>
                        <TabsTrigger value="participants">Peserta</TabsTrigger>
                        <TabsTrigger value="standings">Klasemen</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <EventOverview event={event} />
                    </TabsContent>
                    <TabsContent value="schedules">
                        <EventSchedule days={event.days!} />
                    </TabsContent>
                    <TabsContent value="participants">
                        <EventParticipants
                            participants={allParticipants}
                            onNewParticipants={handleNewParticipants}
                            onFilterParticipants={handleFilterParticipants}
                            subDistricts={subDistricts}
                        />
                    </TabsContent>
                    <TabsContent value="standings">
                        <EventStanding standings={event.standings!} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
