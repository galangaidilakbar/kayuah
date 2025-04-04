import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const Footer = () => {
    const { name } = usePage<SharedData>().props
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto p-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {name}. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
