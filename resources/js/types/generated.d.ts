declare namespace App.Data {
    export type BoatData = {
        id: string;
        village_id: string;
        name: string;
        village: App.Data.VillageData | null;
        participants?: Array<App.Data.ParticipantData> | null;
    };
    export type DayData = {
        id: string;
        event_id: string;
        date: string;
        name: string;
        event: App.Data.EventData | null;
        rounds?: Array<App.Data.RoundData> | null;
    };
    export type DistrictData = {
        id: string;
        code: string | null;
        name: string;
        sub_districts?: Array<App.Data.SubDistrictData> | null;
    };
    export type EventData = {
        id: string;
        venue_id: string;
        name: string;
        start_date: string;
        end_date: string;
        venue: App.Data.VenueData | null;
        days?: Array<App.Data.DayData> | null;
        participants?: Array<App.Data.ParticipantData> | null;
        days_count?: number | null;
        participants_count?: number | null;
    };
    export type ParticipantData = {
        id: string;
        event_id: string;
        boat_id: string;
        event: App.Data.EventData | null;
        boat: App.Data.BoatData | null;
        title: string;
        sponsors?: Array<App.Data.SponsorData> | null;
    };
    export type RaceData = {
        id: string;
        round_id: string;
        number: number;
        left_lane_participant_id: string;
        is_bye: boolean;
        right_lane_participant_id: string;
        winner_id: string | null;
        status: App.Enums.Enums.RaceStatus | null;
        round: App.Data.RoundData | null;
        left_lane_participant: App.Data.ParticipantData | null;
        right_lane_participant: App.Data.ParticipantData | null;
        winner: App.Data.ParticipantData | null;
    };
    export type RoundData = {
        id: string;
        day_id: string;
        name: string;
        order: number;
        day: App.Data.DayData | null;
    };
    export type SponsorData = {
        id: string;
        name: string;
        type: App.Enums.SponsorType | null;
    };
    export type StandingData = {
        id: string;
        event_id: string;
        participant_id: string;
        rank: number;
        event: App.Data.EventData | null;
        participant: App.Data.ParticipantData | null;
    };
    export type SubDistrictData = {
        id: string;
        district_id: string;
        code: string | null;
        name: string;
        district: App.Data.DistrictData | null;
    };
    export type VenueData = {
        id: string;
        sub_district_id: string;
        name: string;
        subDistrict: App.Data.SubDistrictData | null;
    };
    export type VillageData = {
        id: string;
        sub_district_id: string;
        code: string | null;
        name: string;
        sub_district: App.Data.SubDistrictData | null;
        boats?: Array<App.Data.BoatData> | null;
    };
}
declare namespace App.Enums {
    export type SponsorType =
        | 'politician'
        | 'entrepreneur'
        | 'community'
        | 'organization'
        | 'individual'
        | 'corporate'
        | 'company'
        | 'association'
        | 'foundation'
        | 'charity'
        | 'government';
}
declare namespace App.Enums.Enums {
    export type RaceStatus = 'scheduled' | 'prepared' | 'ongoing' | 'paused' | 'completed' | 'cancelled' | 'postponed';
}
