import GuestLayout from '@/layouts/guest-layout';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const { name } = usePage<SharedData>().props;

    return (
        <GuestLayout>
            <Head title="Privacy Policy" />

            <div className="w-full px-6 py-12 md:mx-auto md:max-w-3xl lg:max-w-4xl">
                <div className="max-w-[65ch] lg:text-lg">
                    <h1 className="mb-6 text-3xl font-semibold">Privacy Policy for {name}</h1>

                    <ol className="list-decimal space-y-4 pl-6">
                        <li>
                            <h2 className="text-xl font-medium">Information We Collect</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>
                                    <strong>Account Registration</strong>: When you register, we collect your name and email address.
                                </li>
                                <li>
                                    <strong>Social Login</strong>: If you use social login (e.g., Google, Facebook), we receive your name, email, and
                                    public profile data from the provider.
                                </li>
                                <li>
                                    <strong>Automatically Collected Data</strong>: IP address, browser type, and usage data via cookies (see "Cookies"
                                    section below).
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">How We Use Your Data</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>To create and manage your account.</li>
                                <li>To communicate with you (e.g., password resets).</li>
                                <li>To improve our services.</li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Data Sharing</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>
                                    We <strong>do not</strong> sell your data to third parties.
                                </li>
                                <li>Social login providers (e.g., Google) have their own privacy policies governing data use.</li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Data Retention & Deletion</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Your data is retained until you delete your account.</li>
                                <li>
                                    You can permanently delete your account and associated data via the "Delete Account" button in your profile
                                    settings.
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Security</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Data is encrypted in transit (HTTPS) and stored securely.</li>
                                <li>Passwords are hashed (never stored in plain text).</li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Cookies</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>We use cookies to manage authentication sessions.</li>
                                <li>You can disable cookies in your browser, but this may break login functionality.</li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Changes to This Policy</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Updates will be posted here, with a prominent notice if changes are material.</li>
                            </ul>
                        </li>

                        <li>
                            <h2 className="text-xl font-medium">Contact Us</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>For questions or data requests, email [email address will be provided].</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <p className="text-muted-foreground mt-6 text-sm">Last Update: 5 Apr 2025</p>
            </div>
        </GuestLayout>
    );
}
