<?php

test('unsupported driver redirects to login', function () {
    $response = $this->get('/auth/google/redirect');

    $response->assertRedirect(route('login'));
    $response->assertSessionHasErrors(['socialite' => 'Sign in with google is not supported.']);
});

test('facebook redirect', function () {
    $response = $this->get('/auth/facebook/redirect');
    $response->assertStatus(302); // Redirect to Facebook
    $response->assertRedirectContains('facebook.com');
});
