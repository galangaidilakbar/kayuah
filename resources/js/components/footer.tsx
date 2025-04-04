import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const Footer = () => {
    const { name } = usePage<SharedData>().props;
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto p-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} {name}. All rights reserved.
                    </p>
                    <div className="mt-4 flex space-x-4 md:mt-0">
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
