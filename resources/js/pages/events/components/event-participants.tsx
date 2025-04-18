import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useInitials } from '@/hooks/use-initials';
import { type PaginatedData } from '@/types';
import axios from 'axios';
import { debounce } from 'lodash';
import { Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface EventParticipantsProps {
    participants: PaginatedData<App.Data.ParticipantData>;
    subDistricts: App.Data.SubDistrictData[];
    onNewParticipants: (newParticipants: PaginatedData<App.Data.ParticipantData>) => void;
    onFilterParticipants: (filteredParticipants: PaginatedData<App.Data.ParticipantData>) => void;
}

export default function EventParticipants({ participants, subDistricts, onNewParticipants, onFilterParticipants }: EventParticipantsProps) {
    const getInitials = useInitials();
    const { ref, inView } = useInView({
        threshold: 0,
    });
    const [filter, setFilter] = useState({
        boatName: '',
        subDistrictId: '',
    });

    // Load next page when the observer is in view
    useEffect(() => {
        if (inView && participants.next_page_url) {
            axios
                .get(participants.next_page_url)
                .then((response) => {
                    onNewParticipants(response.data.participants);
                })
                .catch((error) => {
                    console.error('Error fetching participants:', error);
                });
        }
    }, [inView, participants.next_page_url, onNewParticipants]);

    // Debounced filter function
    const debouncedFilter = debounce((boatName) => {
        axios
            .get(window.location.href + `?filter[boat.name]=${boatName}`)
            .then((response) => {
                onFilterParticipants(response.data.participants);
            })
            .catch((error) => {
                console.error('Error filtering participants: ', error);
            });
    }, 300);

    useEffect(() => {
        debouncedFilter(filter.boatName);
    }, [filter.boatName]);

    useEffect(() => {
        return () => {
            debouncedFilter.cancel();
        };
    }, [debouncedFilter]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold md:text-2xl">Jalur yang berpartisipasi</h2>
                <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {participants.total} Jalur
                </Badge>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Peserta Jalur</CardTitle>
                    <CardDescription>Telusuri semua jalur yang berpartisipasi dalam acara ini</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari jalur..."
                                className="pl-9"
                                value={filter.boatName}
                                onChange={(e) => {
                                    setFilter((prevFilter) => ({
                                        ...prevFilter, // Spread the previous filter state
                                        boatName: e.target.value, // Update only the boatName
                                    }));
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {participants.data.length > 0 ? (
                            participants.data.map((participant) => (
                                <div key={participant.id} className="flex items-center gap-3 rounded-md border p-2">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarFallback className="bg-rose-100 text-rose-600">{getInitials(participant.title)}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium break-words">{participant.title}</div>
                                        <div className="text-muted-foreground text-xs">
                                            {participant.boat?.village?.name}, {participant.boat?.village?.sub_district?.name}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center">No participants found matching your criteria</div>
                        )}
                    </div>

                    {/* Infinite Scroll Trigger */}
                    {participants.next_page_url && (
                        <div ref={ref} className="mt-4 text-center">
                            <p className="text-muted-foreground text-sm">Loading more...</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
