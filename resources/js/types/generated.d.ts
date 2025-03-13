declare namespace App.Data {
    export type DistrictData = {
        id: string;
        code: string | null;
        name: string;
    };
    export type SubDistrictData = {
        id: string;
        district_id: string;
        code: string | null;
        name: string;
    };
}
