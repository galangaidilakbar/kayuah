import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function RaceCard({ race }: { race: App.Data.RaceData }) {
    const isCompleted = race.status === 'completed';
    const isInProgress = race.status === 'ongoing';
    const isUpcoming = race.status === 'scheduled';

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">Race #{race.number}</CardTitle>
                    <StatusBadge status={race.status} />
                </div>
                <CardDescription className="text-xs">ID: {race.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-5 gap-2">
                    {/* Left Boat */}
                    <div className={`col-span-2 rounded-lg p-3 ${race.winner_boat === race.left_boat ? 'bg-primary/10' : 'bg-muted'}`}>
                        <div className="mb-1 text-sm font-medium">Left Boat</div>
                        <div className="truncate font-bold">{race.left_boat}</div>
                        {race.winner_boat === race.left_boat && (
                            <div className="text-primary mt-2 flex items-center">
                                <Trophy className="mr-1 h-4 w-4" />
                                <span className="text-xs font-medium">Winner</span>
                            </div>
                        )}
                    </div>

                    {/* VS */}
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="text-muted-foreground text-sm font-bold">VS</div>
                    </div>

                    {/* Right Boat */}
                    <div className={`col-span-2 rounded-lg p-3 ${race.winner_boat === race.right_boat ? 'bg-primary/10' : 'bg-muted'}`}>
                        <div className="mb-1 text-sm font-medium">Right Boat</div>
                        <div className="truncate font-bold">{race.right_boat}</div>
                        {race.winner_boat === race.right_boat && (
                            <div className="text-primary mt-2 flex items-center">
                                <Trophy className="mr-1 h-4 w-4" />
                                <span className="text-xs font-medium">Winner</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="text-muted-foreground pt-1 pb-3 text-xs">
                {isCompleted && <div className="w-full text-center">Race completed with {race.winner_boat} as the winner</div>}
                {isInProgress && <div className="w-full animate-pulse text-center">Race in progress...</div>}
                {isUpcoming && <div className="w-full text-center">Race scheduled to begin soon</div>}
            </CardFooter>
        </Card>
    );
}

const StatusBadge = ({ status }: { status: App.Enums.RaceStatus }) => {
    switch (status) {
        case 'completed':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <Flag className="mr-1 h-3 w-3" />
                    Completed
                </Badge>
            );
        case 'in-progress':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <div className="mr-1 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    In Progress
                </Badge>
            );
        case 'upcoming':
            return (
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Upcoming
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};
