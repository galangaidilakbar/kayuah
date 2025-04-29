import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Award, Circle, Medal, Star, Trophy } from 'lucide-react';

interface EventStandingProps {
    standings: App.Data.StandingData[];
}

export default function EventStanding({ standings }: EventStandingProps) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Klasemen</h2>

            <Card className="w-full">
                <CardContent className="p-0 sm:p-6">
                    <div className="space-y-2">
                        {standings.length > 0 ? (
                            standings.map((standing, index) => (
                                <div
                                    key={standing.id}
                                    className={cn(
                                        'flex items-center gap-3 border-b p-3 last:border-b-0',
                                        standing.rank <= 3
                                            ? 'bg-gradient-to-r from-transparent to-amber-50/50'
                                            : index % 2 === 0
                                              ? 'bg-muted/30'
                                              : '',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex h-8 w-8 items-center justify-center rounded-full',
                                            standing.rank === 1
                                                ? 'bg-yellow-100'
                                                : standing.rank === 2
                                                  ? 'bg-gray-100'
                                                  : standing.rank === 3
                                                    ? 'bg-amber-100'
                                                    : 'bg-slate-50',
                                        )}
                                    >
                                        {getRankIcon(standing.rank)}
                                    </div>
                                    <Avatar className="h-10 w-10 flex-shrink-0 border">
                                        <AvatarFallback className="bg-rose-100 text-rose-600">
                                            {getInitials(standing.participant?.title!)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium break-words">{standing.participant?.title}</div>
                                        <div className="text-muted-foreground truncate text-xs">
                                            {standing.participant?.boat?.village?.name}, {standing.participant?.boat?.village?.sub_district?.name}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {standing.rank === 1
                                            ? 'Juara 1'
                                            : standing.rank === 2
                                              ? 'Juara 2'
                                              : standing.rank === 3
                                                ? 'Juara 3'
                                                : `Peringkat ${standing.rank}`}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center p-8">
                                <span className="text-lg font-semibold">Belum ada klasemen</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Trophy className="h-4 w-4 text-yellow-500" />;
        case 2:
            return <Medal className="h-4 w-4 text-gray-500" />;
        case 3:
            return <Medal className="h-4 w-4 text-amber-700" />;
        case 4:
        case 5:
            return <Award className="h-4 w-4 text-slate-500" />;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            return <Star className="h-3 w-3 text-slate-400" />;
        default:
            return <Circle className="h-2 w-2 text-slate-300" />;
    }
};
