import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Info, MapPin } from 'lucide-react';

interface EventOverviewProps {
    event: App.Data.EventData;
}

export default function EventOverview({ event }: EventOverviewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Informasi Event
                    </CardTitle>
                    <CardDescription>
                        Rincian acara <span className="capitalize">{event.name.toLowerCase()}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Tentang Event</h3>
                            <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: event.about! }}></div>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Detail Event</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CalendarDays className="text-muted-foreground mt-0.5 h-5 w-5" />
                                    <div>
                                        <span className="font-medium">Tanggal:</span>
                                        <p className="text-muted-foreground">
                                            {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                                    <div>
                                        <span className="font-medium">Gelanggang:</span>
                                        <p className="text-muted-foreground capitalize">
                                            {event.venue?.name.toLowerCase()}, {event.venue?.subDistrict?.name}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
