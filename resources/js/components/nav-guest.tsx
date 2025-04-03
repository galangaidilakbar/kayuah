import { SharedData } from "@/types"
import { Link, usePage } from "@inertiajs/react"

export const NavGuest = () => {
    const { name } = usePage<SharedData>().props

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center p-8">
                <Link href="/" className="font-bold uppercase text-xl leading-5 tracking-tight font-mono">{name}</Link>
                <div>Login / Register</div>
            </div>
        </div>
    )
}
