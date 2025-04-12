<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(string $driver)
    {
        $validation = $this->validateSocialiteDriver($driver);

        if ($validation) {
            return $validation;
        }

        return Socialite::driver($driver)->redirect();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $driver)
    {
        try {
            // Validate driver before proceeding
            $validation = $this->validateSocialiteDriver($driver);
            if ($validation) {
                return $validation;
            }

            $currentUser = Socialite::driver($driver)->user();
            $providerId = $driver.'_id';

            // First check if a user with this email already exists
            $existingUser = User::where('email', $currentUser->email)->first();

            if ($existingUser) {
                // User exists with this email, update the social ID for this provider
                $existingUser->{$providerId} = $currentUser->id;
                $existingUser->save();
                $this->assignRoleVisitor($existingUser);
                Auth::login($existingUser, true);

                return redirect()->intended(route('dashboard', absolute: false));
            }

            // Otherwise create a new user or update existing one by provider ID
            $user = User::updateOrCreate(
                [$providerId => $currentUser->id],
                [
                    'name' => $currentUser->name,
                    'email' => $currentUser->email,
                    'email_verified_at' => now(), // Only set this if it's a new record
                ]
            );

            $this->assignRoleVisitor($user);
            Auth::login($user, true);

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            // Determine if it's a user-initiated cancellation or another error
            $errorMessage = str_contains($e->getMessage(), 'cancel') ||
                str_contains($e->getMessage(), 'denied') ?
                'You cancelled the sign in process.' :
                'There was an error signing in with '.$driver.'. Please try again.';

            return redirect()->route('login')->withErrors(['socialite' => $errorMessage]);
        }
    }

    protected function assignRoleVisitor(User $user)
    {
        if ($user->roles->isEmpty()) {
            $user->assignRole(Role::visitor->value);
        }
    }

    protected function validateSocialiteDriver(string $driver)
    {
        $supportedDrivers = ['facebook']; // Adjust as needed

        if (! in_array($driver, $supportedDrivers)) {
            return redirect()->route('login')->withErrors(['socialite' => "Sign in with {$driver} is not supported."]);
        }

        return null;
    }
}
