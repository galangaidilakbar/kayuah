import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Button } from './ui/button';

const getFirstName = (fullname: string): string => {
    return fullname.split(' ')[0];
};

export const NavGuest = () => {
    const { name, auth } = usePage<SharedData>().props;

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between p-8">
                <Link href="/" className="font-mono text-xl leading-5 font-bold tracking-tight uppercase">
                    {name}
                </Link>

                {auth.user ? (
                    <Link href={route('dashboard')}>Hi, {getFirstName(auth.user.name)}!</Link>
                ) : (
                    <Button asChild>
                        <Link href={route('login')}>Login / Register</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};
