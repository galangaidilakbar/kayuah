import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInitials } from '@/hooks/use-initials';
import { type PaginatedData } from '@/types';
import { Users } from 'lucide-react';

interface EventParticipantsProps {
    participants: PaginatedData<App.Data.ParticipantData>;
}

export default function EventParticipants({ participants }: EventParticipantsProps) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold md:text-2xl">Jalur yang berpartisipasi</h2>
                <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {participants.total} Jalur
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Peserta Jalur</CardTitle>
                    <CardDescription>Telusuri semua jalur yang berpartisipasi dalam acara ini</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Participants Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Jalur</TableHead>
                                    <TableHead className="hidden md:table-cell">Asal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.data.length > 0 ? (
                                    participants.data.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="bg-rose-100 text-rose-600">
                                                            {getInitials(participant.title)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <div className="font-medium">{participant.title}</div>
                                                        <div className="text-muted-foreground block text-xs md:hidden">
                                                            {participant.boat?.village?.name}, {participant.boat?.village?.sub_district?.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {participant.boat?.village?.name}, {participant.boat?.village?.sub_district?.name}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No participants found matching your criteria
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
