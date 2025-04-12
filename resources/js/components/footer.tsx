import type { SharedData } from '@/types';
import { SiGithub, SiSlack, SiX } from '@icons-pack/react-simple-icons';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Code, Heart, Users } from 'lucide-react';

const Footer = () => {
    const { name } = usePage<SharedData>().props;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">{name}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                            An open source project dedicated to making development easier and more accessible for everyone.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <SiGithub size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <SiX size={20} />
                            </a>
                            <a href="https://slack.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Slack">
                                <SiSlack size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Documentation Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Documentation</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors">
                                    <BookOpen size={16} />
                                    <span>Getting Started</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors">
                                    <Code size={16} />
                                    <span>API Reference</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors">
                                    <Users size={16} />
                                    <span>Examples</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Community</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    GitHub Discussions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Discord Server
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Stack Overflow
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Contributing Guide
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={route('legal.privacy-policy')}
                                    prefetch
                                    className={`text-muted-foreground hover:text-foreground text-sm transition-colors ${route().current('legal.privacy-policy') ? 'text-foreground' : ''}`}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    License (MIT)
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-border flex flex-col items-center justify-between border-t pt-8 md:flex-row">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} {name}. All rights reserved.
                    </p>
                    <div className="mt-4 flex items-center md:mt-0">
                        <span className="text-muted-foreground flex items-center text-sm">
                            Made with <Heart size={14} className="mx-1 text-red-500" /> by the community
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
