import { Head } from "@inertiajs/react"

export default function Page() {
    return (
        <>
            <Head title="Welcome"></Head>
            <main className="min-h-screen flex justify-center items-center">
                <div className="text-3xl font-bold">
                    Hello World
                </div>
            </main>
        </>
    )
}
