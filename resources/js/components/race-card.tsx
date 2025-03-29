import { AlertCircle, ChevronDown, ChevronUp, Flag, MapPin, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function RaceCard({ race }: { race: App.Data.RaceData }) {
    const [expanded, setExpanded] = useState(false);
    const isCompleted = race.status === 'completed';
    const isInProgress = race.status === 'ongoing';
    const isUpcoming = race.status === 'scheduled';
    const winner = race.winner_id === race.left_lane_participant_id ? race.left_lane_participant?.title : race.right_lane_participant?.title;

    return (
        <Card className="border-l-primary overflow-hidden border-l-4 transition-all hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">Hilir ke #{race.number}</CardTitle>
                    <StatusBadge status={race.status} />
                </div>
                <CardDescription className="text-xs">ID: {race.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    {/* Left Boat */}
                    <div
                        className={`rounded-lg p-4 ${
                            race.winner_id === race.left_lane_participant_id ? 'bg-primary/10 border-primary/20 border' : 'bg-muted'
                        }`}
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <div className="mb-1 flex items-center text-sm font-medium">
                                Jalan sebelah kiri
                                {race.winner_id === race.left_lane_participant_id && (
                                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 ml-2">
                                        <Trophy className="mr-1 h-3 w-3" />
                                        Winner
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className={`text-base font-bold ${expanded ? '' : 'line-clamp-1'}`}>{race.left_lane_participant?.title}</div>

                        {race.left_lane_participant?.boat?.village && (
                            <div className="text-muted-foreground mt-1 flex items-center text-sm">
                                <MapPin className="mr-1 inline h-3 w-3" />
                                {race.left_lane_participant.boat.village.name}
                                {race.left_lane_participant.boat.village.sub_district?.name && (
                                    <>, {race.left_lane_participant.boat.village.sub_district.name}</>
                                )}
                            </div>
                        )}
                    </div>

                    {/* VS Section */}
                    <div className="relative flex items-center justify-center py-1">
                        <div className="bg-muted-foreground/20 absolute right-0 left-0 h-px"></div>
                        <div className="bg-card z-10 px-4">
                            <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold">
                                VS
                            </div>
                        </div>
                    </div>

                    {/* Right Boat */}
                    <div
                        className={`rounded-lg p-4 ${
                            race.winner_id === race.right_lane_participant_id ? 'bg-primary/10 border-primary/20 border' : 'bg-muted'
                        }`}
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <div className="mb-1 flex items-center text-sm font-medium">
                                Jalan sebelah kanan
                                {race.winner_id === race.right_lane_participant_id && (
                                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 ml-2">
                                        <Trophy className="mr-1 h-3 w-3" />
                                        Winner
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className={`text-base font-bold ${expanded ? '' : 'line-clamp-1'}`}>{race.right_lane_participant?.title}</div>

                        {race.right_lane_participant?.boat?.village && (
                            <div className="text-muted-foreground mt-1 flex items-center text-sm">
                                <MapPin className="mr-1 inline h-3 w-3" />
                                {race.right_lane_participant.boat.village.name}
                                {race.right_lane_participant.boat.village.sub_district?.name && (
                                    <>, {race.right_lane_participant.boat.village.sub_district.name}</>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Expand/Collapse button */}
                <Button variant="ghost" size="sm" className="text-muted-foreground mt-2 w-full text-xs" onClick={() => setExpanded(!expanded)}>
                    {expanded ? (
                        <>
                            <ChevronUp className="mr-1 h-3 w-3" />
                            Show less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="mr-1 h-3 w-3" />
                            Show more
                        </>
                    )}
                </Button>
            </CardContent>
            <CardFooter className="text-muted-foreground pt-1 pb-3 text-xs">
                {isCompleted && <div className="w-full text-center">Race completed with {winner} as the winner</div>}
                {isInProgress && <div className="w-full animate-pulse text-center">Race in progress...</div>}
                {isUpcoming && <div className="w-full text-center">Race scheduled to begin soon</div>}
            </CardFooter>
        </Card>
    );
}

const StatusBadge = ({ status }: { status: App.Enums.RaceStatus | null }) => {
    switch (status) {
        case 'completed':
            return (
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    <Flag className="mr-1 h-3 w-3" />
                    Completed
                </Badge>
            );
        case 'ongoing':
            return (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <div className="mr-1 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    In Progress
                </Badge>
            );
        case 'scheduled':
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
