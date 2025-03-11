<?php

namespace App\Filament\Resources\EventResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StandingsRelationManager extends RelationManager
{
    protected static string $relationship = 'standings';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('rank')
                    ->required()
                    ->numeric(),
                Forms\Components\Select::make('participant_id')
                    ->options(function (RelationManager $livewire): array {
                        return $livewire->getOwnerRecord()->participants->load(['boat', 'sponsors'])
                            ->pluck('title', 'id')
                            ->toArray();
                    })
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('rank')
            ->columns([
                Tables\Columns\TextColumn::make('rank')
                    ->sortable()
                    ->prefix('#'),
                Tables\Columns\TextColumn::make('participant.title'),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->modifyQueryUsing(fn (Builder $query) => $query->with(['participant.boat', 'participant.sponsors'])->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]));
    }
}
