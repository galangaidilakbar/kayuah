import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { format, formatDistance, isPast, isWithinInterval } from 'date-fns';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';

export default function EventCard({ event }: { event: App.Data.EventData }) {
    // Format dates
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    // Determine event status
    const isActive = isWithinInterval(new Date(), { start: startDate, end: endDate });
    const isPastEvent = isPast(endDate);

    // Get relative time text
    const getTimeText = () => {
        if (isPastEvent) {
            return formatDistance(endDate, new Date(), { addSuffix: true });
        } else if (isActive) {
            return `Ends ${formatDistance(endDate, new Date(), { addSuffix: true })}`;
        } else {
            return `Starts ${formatDistance(startDate, new Date(), { addSuffix: true })}`;
        }
    };

    return (
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="mb-1 line-clamp-2 text-lg leading-tight font-bold">{event.name}</CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.venue?.name || 'Location not specified'}</span>
                    {event.venue?.subDistrict && <span className="text-muted-foreground">• {event.venue?.subDistrict?.name}</span>}
                </div>

                <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                        <div>
                            <span>{format(startDate, 'MMM d, yyyy')}</span>
                            {!event.start_date.includes(event.end_date) && (
                                <>
                                    {' - '}
                                    <span>{format(endDate, 'MMM d, yyyy')}</span>
                                </>
                            )}
                        </div>
                        <span className="text-gray-500">({getTimeText()})</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>
                        {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-end">
                <Button asChild className="group">
                    <Link href={route('events.show', event.id)}>
                        View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
