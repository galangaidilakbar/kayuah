import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format, formatDistance, isFuture, isPast, isWithinInterval } from 'date-fns';
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
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            {/* Visual indicator for event status */}
            <div className={`h-1 w-full ${isPastEvent ? 'bg-gray-400' : isActive ? 'bg-green-500' : 'bg-blue-400'}`}></div>

            <CardHeader className="pb-3">
                <div className='flex justify-end'>
                    <Badge variant={badgeInfo.variant}>
                        {badgeInfo.text}
                    </Badge>
                </div>

                <CardTitle className="text-xl font-bold">{event.name}</CardTitle>

                <CardDescription className="flex space-x-1 items-center text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue?.name || 'Location not specified'}</span>
                </CardDescription>
            </CardHeader>

            <CardContent className='space-y-2'>
                <div className="flex space-x-1 items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                        <span className="font-medium">{format(startDate, 'dd MMM yyyy')}</span>
                        {!event.start_date.includes(event.end_date) && (
                            <>
                                {' '}
                                - <span className="font-medium">{format(endDate, 'dd MMM yyyy')}</span>
                            </>
                        )}
                        <span className="ml-2 text-sm text-gray-500">({getTimeText()})</span>
                    </div>
                </div>

                <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                        <span>
                            {daysCount} {daysCount === 1 ? 'day' : 'days'}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-gray-500" />
                        <span>
                            {participantsCount} {participantsCount === 1 ? 'participant' : 'participants'}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-gray-50 pt-0">
                <div className="text-sm text-gray-500">ID: {event.id.substring(0, 8)}...</div>
                <div className="flex cursor-pointer items-center text-sm text-blue-600 hover:text-blue-800">
                    View details
                    <ChevronRight className="ml-1 h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
