import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { format, formatDistance, isPast, isWithinInterval } from 'date-fns';
import { Calendar, ChevronRight, MapPin, Users } from 'lucide-react';

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

    // Get badge variant and text based on status
    const getBadgeInfo = () => {
        if (isPastEvent) {
            return { variant: 'secondary' as const, text: 'Past' };
        } else if (isActive) {
            return { variant: 'default' as const, text: 'Active' };
        } else {
            return { variant: 'outline' as const, text: 'Upcoming' };
        }
    };

    const badgeInfo = getBadgeInfo();

    // Calculate metrics
    const daysCount = event.days_count || 0;
    const participantsCount = event.participants_count || 0;

    return (
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="mb-1 line-clamp-2 text-lg leading-tight font-bold">{event.name}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-gray-600">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="line-clamp-1">{event.venue?.name || 'Location not specified'}</span>
                        </CardDescription>
                    </div>
                    <Badge variant={badgeInfo.variant} className="ml-2 whitespace-nowrap">
                        {badgeInfo.text}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <div>
                            <span className="font-medium">{format(startDate, 'dd MMM yyyy')}</span>
                            {!event.start_date.includes(event.end_date) && (
                                <>
                                    {' - '}
                                    <span className="font-medium">{format(endDate, 'dd MMM yyyy')}</span>
                                </>
                            )}
                        </div>
                        <span className="text-gray-500 sm:ml-2">({getTimeText()})</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Calendar className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
                        <span>
                            {daysCount} {daysCount === 1 ? 'day' : 'days'}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <Users className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
                        <span>
                            {participantsCount} {participantsCount === 1 ? 'participant' : 'participants'}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-end">
                <Button asChild>
                    <Link href={route('events.show', event.id)}>
                        View details <ChevronRight />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
