import RaceCard from '@/components/race-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ShowProps {
    round: App.Data.RoundData;
    races: PaginatedData<App.Data.RaceData>;
}

export default function Show({ round, races }: ShowProps) {
    const [allRaces, setAllRaces] = useState(races);

    const [filter, setFilter] = useState({
        boatName: '',
        number: '',
    });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: route('events.index'),
        },
        {
            title: round.day?.event?.name || 'Event Detail',
            href: route('events.show', round.day?.event_id),
        },
        {
            title: round.day?.name + ' - ' + round.name,
            href: route('rounds.show', round.id),
        },
    ];

    // Debounced filter function
    const debouncedFilter = debounce((boatName: string, number: string) => {
        const query = new URLSearchParams();
        if (boatName) {
            query.append('filter[boat_name]', boatName.toUpperCase());
        }
        if (number) {
            query.append('sort', number);
        }

        axios
            .get(`${window.location.href}?${query.toString()}`)
            .then((response) => {
                setAllRaces(response.data.races);
            })
            .catch((error) => {
                console.error('Error filtering races: ', error);
            });
    }, 300);

    useEffect(() => {
        debouncedFilter(filter.boatName, filter.number);
    }, [filter.boatName, filter.number]);

    useEffect(() => {
        return () => {
            debouncedFilter.cancel();
        };
    }, [debouncedFilter]);

    const infiniteScrollRaces = () => {
        if (inView && allRaces.next_page_url) {
            axios
                .get(allRaces.next_page_url)
                .then((response) => {
                    handleNewRaces(response.data.races);
                })
                .catch((error) => {
                    console.error('Error fetching participants:', error);
                });
        }
    };

    const handleNewRaces = (newRaces: PaginatedData<App.Data.RaceData>) => {
        setAllRaces((prevRaces) => {
            // Filter out duplicates based on participant.id
            const existingIds = new Set(prevRaces.data.map((p) => p.id));
            const uniqueNewData = newRaces.data.filter((p) => !existingIds.has(p.id));

            return {
                ...newRaces,
                data: [...prevRaces.data, ...uniqueNewData],
                next_page_url: newRaces.next_page_url,
            };
        });
    };

    useEffect(() => {
        infiniteScrollRaces();
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={round.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-xl font-medium">{round.name}</h1>

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
                    <div className="w-full md:w-64">
                        <Select
                            value={filter.number}
                            onValueChange={(value) => {
                                setFilter((prevFilter) => ({
                                    ...prevFilter,
                                    number: value,
                                }));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by Hilir" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortBy.map((sort) => (
                                    <SelectItem key={sort.value} value={sort.value}>
                                        {sort.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {allRaces.data.map((race) => (
                    <RaceCard key={race.id} race={race} />
                ))}

                {/* Infinite Scroll Trigger */}
                {allRaces.next_page_url && (
                    <div ref={ref} className="mt-4 text-center">
                        <p className="text-muted-foreground text-sm">Loading more...</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

const sortBy = [
    {
        value: 'number',
        name: 'Hilir terkecil ke terbesar',
    },
    {
        value: '-number',
        name: 'Hilir terbesar ke terkecil',
    },
];
