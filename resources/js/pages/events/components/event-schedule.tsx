import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ChevronRight } from 'lucide-react';

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
                                    <CardTitle className="text-xl">{day.name}</CardTitle>
                                </div>
                                <Badge variant="outline">{formatDate(day.date)}</Badge>
                            </div>
                            <CardDescription>{day.rounds?.length || 0} putaran</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {day.rounds?.map((round, index) => (
                                    <a
                                        href={route('rounds.show', round.id)}
                                        key={round.id}
                                        className="group hover:bg-muted/50 flex items-center justify-between p-4 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 text-primary group-hover:bg-primary dark:group-hover:text-background flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors group-hover:text-white">
                                                {round.order || index + 1}
                                            </div>
                                            <span className="font-medium">{round.name}</span>
                                        </div>
                                        <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
