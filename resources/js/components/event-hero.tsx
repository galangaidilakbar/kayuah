import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EventHero({ event }: { event: App.Data.EventData }) {
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

    const thumbnail = event.thumbnail ? event.thumbnail : 'placeholder.svg';

    return (
        <div className="from-primary/10 to-primary/5 relative w-full overflow-hidden bg-gradient-to-r py-12 md:py-20">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-20"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    {/* Event details */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                            {isLive && (
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                                    </span>
                                    <Badge variant="destructive" className="text-xs font-medium tracking-wider uppercase">
                                        Live Now
                                    </Badge>
                                </div>
                            )}
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{event.name}</h1>
                        </div>

                        <div className="text-muted-foreground space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-primary h-5 w-5" />
                                <span className="capitalize">{event.venue?.name.toLowerCase()}</span>
                                {event.venue?.subDistrict && <span className="text-muted-foreground">• {event.venue?.subDistrict?.name}</span>}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="text-primary h-5 w-5" />
                                <span>
                                    {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="text-primary h-5 w-5" />
                                <span>{event.participants_count} jalur</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="group" asChild>
                                <Link href="/live-races">
                                    Watch Live
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Event image */}
                    <Card className="relative aspect-video overflow-hidden py-0">
                        <img src={thumbnail} alt={event.name} className="object-cover" />
                        {isLive && (
                            <div className="absolute top-4 right-4">
                                <Badge variant="destructive" className="px-3 py-1.5 text-sm font-medium tracking-wider uppercase">
                                    Live Now
                                </Badge>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
