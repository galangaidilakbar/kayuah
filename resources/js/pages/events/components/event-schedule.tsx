import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock } from 'lucide-react';

interface EventScheduleProps {
    days: App.Data.DayData[];
}

export default function EventSchedule({ days }: EventScheduleProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Jadwal Event</h2>

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
                            <CardDescription>{day.rounds?.length || 0} putaran</CardDescription>
                        </CardHeader>
                        <CardContent className='w-full space-y-4 divide-y-2 divide-dashed'>
                            {day.rounds?.map((round, index) => (
                                <div className="flex items-center gap-2 p-4" key={round.id}>
                                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                                        {round.order || index + 1}
                                    </div>
                                    <span>{round.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
