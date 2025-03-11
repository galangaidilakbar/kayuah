<?php

namespace App\Filament\Resources\RoundResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RacesRelationManager extends RelationManager
{
    protected static string $relationship = 'races';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('number')
                    ->required()
                    ->columnSpanFull()
                    ->numeric(),
                Forms\Components\Select::make('left_lane_participant_id')
                    ->options(function (RelationManager $livewire): array {
                        return $livewire->getOwnerRecord()
                            ->day
                            ->event
                            ->participants->load(['boat', 'sponsors'])
                            ->pluck('title', 'id')
                            ->toArray();
                    })
                    ->nullable()
                    ->searchable()
                    ->columnSpanFull()
                    ->label('Left Lane Participant'),
                Forms\Components\Select::make('right_lane_participant_id')
                    ->options(function (RelationManager $livewire): array {
                        return $livewire->getOwnerRecord()
                            ->day
                            ->event
                            ->participants->load(['boat', 'sponsors'])
                            ->pluck('title', 'id')
                            ->toArray();
                    })
                    ->nullable()
                    ->searchable()
                    ->label('Right Lane Participant')->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('number')
            ->columns([
                Tables\Columns\TextColumn::make('number')->numeric()->prefix('#')->sortable(),
                Tables\Columns\TextColumn::make('leftLaneParticipant.title')->limit(30),
                Tables\Columns\TextColumn::make('rightLaneParticipant.title')->limit(30),
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
            ->modifyQueryUsing(fn (Builder $query) => $query->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]));
    }
}
