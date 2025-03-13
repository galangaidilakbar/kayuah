declare namespace App.Data {
    export type DistrictData = {
        id: string;
        code: string | null;
        name: string;
        subDistricts: Array<App.Data.SubDistrictData> | null;
    };
    export type SubDistrictData = {
        id: string;
        district_id: string;
        code: string | null;
        name: string;
    };
}
