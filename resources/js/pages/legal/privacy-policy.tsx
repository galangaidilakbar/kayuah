import GuestLayout from '@/layouts/guest-layout';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const { name } = usePage<SharedData>().props;

    return (
        <GuestLayout>
            <div className="container mx-auto p-8">
                <h1 className="text-xl font-bold">Privacy Policy for {name}</h1>
            </div>
        </GuestLayout>
    );
}
