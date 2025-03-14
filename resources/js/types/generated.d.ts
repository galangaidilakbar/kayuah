declare namespace App.Data {
    export type BoatData = {
        id: string;
        village_id: string;
        name: string;
        village: App.Data.VillageData | null;
    };
    export type DistrictData = {
        id: string;
        code: string | null;
        name: string;
        sub_districts?: Array<App.Data.SubDistrictData> | null;
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
    };
}
