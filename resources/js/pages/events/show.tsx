import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, MapPin, Trophy, Users } from 'lucide-react';
import EventSchedule from './components/event-schedule';

interface ShowProps {
    event: App.Data.EventData;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
                    <img src={event.thumbnail || '/placeholder.svg'} alt={event.name} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">{event.name}</h1>
                        <div className="flex flex-wrap gap-4 text-white">
                            <div className="flex items-center gap-1">
                                <CalendarDays className="h-5 w-5" />
                                <span>
                                    {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                <span>
                                    {event.venue?.name}, {event.venue?.subDistrict?.name}
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
                            <p className="text-muted-foreground text-sm">Duration</p>
                            <p className="text-xl font-semibold">{event.days_count} Days</p>
                        </div>
                    </div>
                    <div className="dark:bg-secondary flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                        <div className="rounded-full bg-emerald-100 p-3">
                            <Users className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Participants</p>
                            <p className="text-xl font-semibold">{event.participants_count} Teams</p>
                        </div>
                    </div>
                    <div className="dark:bg-secondary flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                        <div className="rounded-full bg-amber-100 p-3">
                            <Trophy className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Competition</p>
                            <p className="text-xl font-semibold">Dragon Boat Racing</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="schedules" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="schedules">Jadwal</TabsTrigger>
                            <TabsTrigger value="participants">Peserta</TabsTrigger>
                            <TabsTrigger value="standings">Peringkat</TabsTrigger>
                        </TabsList>
                        <TabsContent value="schedules">
                            <EventSchedule days={event.days!} />
                        </TabsContent>
                        <TabsContent value="participants">table jalur-jalur yang ikut.</TabsContent>
                        <TabsContent value="standings">Tabel jalur-jalur yang juara.</TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
