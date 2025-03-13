import { Head, usePage } from '@inertiajs/react';

export default function District() {
    const { props } = usePage<{ districts: App.Data.DistrictData[] }>();

    const { districts } = props;

    return (
        <div className="space-y-6 p-8">
            <Head title="Districts" />

            <h1 className="text-2xl font-bold">Districts</h1>

            <div>
                <ul className="space-y-6">
                    {districts.map((district) => (
                        <li key={district.id}>
                            <div className="text-xl">{district.name}</div>
                            <div className="text-sm">{district.code}</div>
                            <div>{district.subDistricts?.length} sub districts</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
