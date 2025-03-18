import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format, formatDistance } from 'date-fns';
import { Calendar, ChevronRight, MapPin, Users } from 'lucide-react';

export default function EventCard({ event }: { event: App.Data.EventData }) {
    console.log(event);

    // Format dates
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const isActive = new Date() >= startDate && new Date() <= endDate;
    const timeUntil = startDate > new Date() ? formatDistance(startDate, new Date(), { addSuffix: true }) : null;

    // Calculate metrics
    const daysCount = event.days?.length || 0;
    const participantsCount = event.participants?.length || 0;

    return (
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            {/* Visual indicator for active events */}
            {isActive && <div className="h-1 w-full bg-green-500"></div>}

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
                    <Badge variant={isActive ? 'default' : 'outline'} className="ml-2">
                        {isActive ? 'Active' : 'Upcoming'}
                    </Badge>
                </div>
                <CardDescription className="mt-2 flex items-center text-sm">
                    <MapPin className="mr-1 h-4 w-4" />
                    {event.venue?.name || 'Location not specified'}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
                <div className="mb-3 flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <div>
                        <span className="font-medium">{format(startDate, 'dd MMM yyyy')}</span>
                        {!event.start_date.includes(event.end_date) && (
                            <>
                                {' '}
                                - <span className="font-medium">{format(endDate, 'dd MMM yyyy')}</span>
                            </>
                        )}
                        {timeUntil && <span className="ml-2 text-sm text-gray-500">({timeUntil})</span>}
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

            <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-gray-500">ID: {event.id.substring(0, 8)}...</div>
                <div className="flex cursor-pointer items-center text-sm text-blue-600 hover:text-blue-800">
                    View details
                    <ChevronRight className="ml-1 h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
