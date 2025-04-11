import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock } from 'lucide-react';

interface EventScheduleProps {
    days: App.Data.DayData[];
}

export default function EventSchedule({ days }: EventScheduleProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Event Schedule</h2>

            <div className="space-y-4">
                {days.map((day) => (
                    <Card key={day.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="text-muted-foreground h-5 w-5" />
                                    <CardTitle>{day.name}</CardTitle>
                                </div>
                                <Badge variant="outline">{formatDate(day.date)}</Badge>
                            </div>
                            <CardDescription>{day.rounds?.length || 0} rounds scheduled</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {day.rounds?.map((round, index) => (
                                    <AccordionItem key={round.id} value={round.id}>
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                                                    {round.order || index + 1}
                                                </div>
                                                <span>{round.name}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pt-2 pl-10">
                                                <div className="border-muted space-y-4 border-l-2 pl-4">
                                                    {/* This would typically come from the races data */}
                                                    {[1, 2, 3].map((raceNum) => (
                                                        <div key={raceNum} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="text-muted-foreground h-4 w-4" />
                                                                <span>Race {raceNum}</span>
                                                            </div>
                                                            <div className="text-muted-foreground text-sm">
                                                                {/* Mock time slots */}
                                                                {`${9 + raceNum}:00 AM - ${9 + raceNum}:30 AM`}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
