import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { Medal, Trophy } from 'lucide-react';

interface EventStandingProps {
    standings: App.Data.StandingData[];
}

export default function EventStanding({ standings }: EventStandingProps) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Klasemen</h2>

            <Card className="w-full">
                <CardContent>
                    <div className="space-y-4">
                        {standings.length > 0 ? (
                            standings.map((standing) => (
                                <div key={standing.id} className="flex items-center gap-3 rounded-md border p-2">
                                    <div className="flex items-center gap-2">
                                        {getMedalIcon(standing.rank)}
                                        <span>{standing.rank}</span>
                                    </div>
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarFallback className="bg-rose-100 text-rose-600">
                                            {getInitials(standing.participant?.title!)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium break-words">{standing.participant?.title}</div>
                                        <div className="text-muted-foreground text-xs">
                                            {standing.participant?.boat?.village?.name}, {standing.participant?.boat?.village?.sub_district?.name}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center p-4">
                                <span className="text-lg font-semibold">Belum ada klasemen</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const getMedalIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Trophy className="h-5 w-5 text-yellow-500" />;
        case 2:
            return <Medal className="h-5 w-5 text-gray-400" />;
        case 3:
            return <Medal className="h-5 w-5 text-amber-700" />;
        default:
            return null;
    }
};
