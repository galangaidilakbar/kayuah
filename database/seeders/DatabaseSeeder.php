<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

use function Amp\now;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            ShieldSeeder::class,
        ]);

        $super_admin_user = new User;

        $super_admin_user->name = env('SUPER_ADMIN_NAME');
        $super_admin_user->email = env('SUPER_ADMIN_EMAIL');
        $super_admin_user->password = env('SUPER_ADMIN_PASSWORD');
        $super_admin_user->email_verified_at = now();

        $super_admin_user->save();

        Artisan::call('shield:super-admin', [
            '--user' => $super_admin_user->id,
        ]);
    }
}
