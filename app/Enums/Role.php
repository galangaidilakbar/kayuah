<?php

namespace App\Enums;

enum Role: string
{
    case super_admin = 'super_admin';
    case editor = 'editor';
    case visitor = 'visitor';
}
