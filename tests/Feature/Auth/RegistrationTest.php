<?php

use App\Enums\Role as EnumsRole;
use App\Models\User;
use Spatie\Permission\Models\Role;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    Role::create(['name' => EnumsRole::visitor->value]);

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users should have role visitor', function () {
    Role::create(['name' => EnumsRole::visitor->value]);

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::whereEmail('test@example.com')->first();
    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
    expect($user->hasRole(EnumsRole::visitor->value))->toBeTrue();
});
