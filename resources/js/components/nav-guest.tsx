import { Button } from '@/components/ui/button';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const getFirstName = (fullname: string): string => {
    return fullname.split(' ')[0];
};

export const NavGuest = () => {
    const { name, auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-background border-b">
            <div className="container mx-auto">
                <div className="flex items-center justify-between px-4 py-4 md:px-6">
                    <Link
                        href="/"
                        className="text-primary hover:text-primary/90 font-mono text-xl font-bold tracking-tight uppercase transition-colors"
                    >
                        {name}
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden md:block">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">Welcome back</span>
                                <Button variant="outline" asChild>
                                    <Link href={route('dashboard')}>{getFirstName(auth.user.name)}</Link>
                                </Button>
                            </div>
                        ) : (
                            <Button asChild>
                                <Link href={route('login')}>Login / Register</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="border-t px-4 py-3 md:hidden">
                        {auth.user ? (
                            <Button variant="outline" asChild className="w-full justify-start">
                                <Link href={route('dashboard')}>Hi, {getFirstName(auth.user.name)}!</Link>
                            </Button>
                        ) : (
                            <Button asChild className="w-full">
                                <Link href={route('login')}>Login / Register</Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};
