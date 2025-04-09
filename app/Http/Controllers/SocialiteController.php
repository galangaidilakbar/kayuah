<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(string $driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $driver)
    {
        $currentUser = Socialite::driver($driver)->user();
        $providerId = $driver.'_id';

        // Prepare attributes
        $attributes = [
            'name' => $currentUser->name,
            'email' => $currentUser->email,
        ];

        // Check if user exists first
        // Add email_verified_at only for new users
        if (
            ! User::where($providerId, $currentUser->id)->exists()
        ) {
            $attributes['email_verified_at'] = now();
        }

        $user = User::updateOrCreate(
            [$providerId => $currentUser->id],
            $attributes
        );

        // assign the user with role visitor if there is no roles attached
        if ($user->roles->isEmpty()) {
            $user->assignRole(Role::visitor->value);
        }

        Auth::login($user, true);

        return to_route('dashboard');
    }
}
