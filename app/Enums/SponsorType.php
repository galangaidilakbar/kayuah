<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum SponsorType: string implements HasLabel
{
    case politician = 'politician';
    case entrepreneur = 'entrepreneur';
    case community = 'community';
    case organization = 'organization';
    case individual = 'individual';
    case corporate = 'corporate';
    case company = 'company';
    case association = 'association';
    case foundation = 'foundation';
    case charity = 'charity';
    case government = 'government';

    public function getLabel(): ?string
    {
        return $this->name;
    }
}
