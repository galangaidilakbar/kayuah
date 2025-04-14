import { type PaginatedData } from '@/types';

interface EventParticipantsProps {
    participants: PaginatedData<App.Data.ParticipantData>;
}

export default function EventParticipants({ participants }: EventParticipantsProps) {
    console.log(participants);

    return (
        <div>
            {participants.data.map((participant) => (
                <div key={participant.id}>
                    <h3>{participant.title}</h3>
                    <p>
                        {participant.boat?.village?.name}, {participant.boat?.village?.sub_district?.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
