import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EventCardProps {
    event: App.Data.EventData;
}

export default function EventCard({ event }: EventCardProps) {
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        // Check if event is currently live
        const now = new Date();
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);

        setIsLive(now >= startDate && now <= endDate);

        // Update live status every minute
        const interval = setInterval(() => {
            const currentTime = new Date();
            setIsLive(currentTime >= startDate && currentTime <= endDate);
        }, 60000);

        return () => clearInterval(interval);
    }, [event.start_date, event.end_date]);

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM d, yyyy');
    };

    return (
        <Card className="h-full overflow-hidden py-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                    src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(event.name)}`}
                    alt={event.name}
                    className="object-cover transition-transform hover:scale-105"
                />
                {isLive && (
                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="destructive" className="px-2 py-1 text-xs font-medium tracking-wider uppercase">
                            <span className="relative mr-1.5 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                            </span>
                            Live Now
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-4">
                <h3 className="line-clamp-2 text-xl font-bold">{event.name}</h3>

                <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                    {event.venue && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="text-primary h-4 w-4" />
                            <span>{event.venue.name}</span>
                            {event.venue?.subDistrict && <span className="text-muted-foreground">• {event.venue?.subDistrict?.name}</span>}
                        </div>
                    )}

                    <div className="flex items-center gap-1.5">
                        <Calendar className="text-primary h-4 w-4" />
                        <span>
                            {formatDate(event.start_date)} - {formatDate(event.end_date)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Users className="text-primary h-4 w-4" />
                        <span>{event.participants_count} jalur</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="group w-full" asChild>
                    <Link href={`/events/${event.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
