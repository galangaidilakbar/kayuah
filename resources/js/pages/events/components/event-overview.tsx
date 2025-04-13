import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Info, MapPin } from 'lucide-react';

interface EventOverviewProps {
    event: App.Data.EventData;
}

export default function EventOverview({ event }: EventOverviewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
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
                        Event Information
                    </CardTitle>
                    <CardDescription>Details about the {event.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">About the Event</h3>
                            <p className="text-muted-foreground">
                                This prestigious dragon boat racing event brings together the best teams from various villages to compete for glory
                                and honor. Spectators can enjoy the thrilling races, cultural performances, and festive atmosphere.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Event Details</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CalendarDays className="text-muted-foreground mt-0.5 h-5 w-5" />
                                    <div>
                                        <span className="font-medium">Dates:</span>
                                        <p className="text-muted-foreground">
                                            {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                                    <div>
                                        <span className="font-medium">Venue:</span>
                                        <p className="text-muted-foreground">
                                            {event.venue?.name}, {event.venue?.subDistrict?.name}, {event.venue?.subDistrict?.district?.name}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Rules & Regulations</CardTitle>
                    <CardDescription>Official competition guidelines</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Race Format</h3>
                            <p className="text-muted-foreground">
                                The competition follows a standard elimination format with qualifying rounds, quarter-finals, semi-finals, and finals.
                                Each race consists of two boats competing head-to-head in separate lanes.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Team Composition</h3>
                            <p className="text-muted-foreground">
                                Each boat must have a standard crew composition including paddlers, a drummer, and a steerer. All team members must be
                                registered before the event starts.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Judging Criteria</h3>
                            <p className="text-muted-foreground">
                                The winner of each race is determined by the first boat to cross the finish line. In case of disputes, the decision of
                                the chief judge is final.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
