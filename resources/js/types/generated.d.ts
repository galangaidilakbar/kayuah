declare namespace App.Data {
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
    export type VillageData = {
        id: string;
        sub_district_id: string;
        code: string | null;
        name: string;
        sub_district: App.Data.SubDistrictData | null;
    };
}
