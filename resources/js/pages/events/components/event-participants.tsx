import { type PaginatedData } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface EventParticipantsProps {
    participants: PaginatedData<App.Data.ParticipantData>;
}

export default function EventParticipants({ participants }: EventParticipantsProps) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">Jalur yang berpartisipasi</h2>
                <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {participants.total} Jalur
                </Badge>
            </div>

            {participants.data.map((participant) => (
                <div key={participant.id}>
                    <div>
                        {getInitials(participant.title)}
                    </div>
                    <h3>{participant.title}</h3>
                    <p>
                        {participant.boat?.village?.name}, {participant.boat?.village?.sub_district?.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
