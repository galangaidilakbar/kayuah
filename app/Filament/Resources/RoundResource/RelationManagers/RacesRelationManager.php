<?php

namespace App\Filament\Resources\RoundResource\RelationManagers;

use App\Enums\RaceStatus;
use App\Models\Race;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RacesRelationManager extends RelationManager
{
    protected static string $relationship = 'races';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->required()->prefix('#')->numeric(),

            Forms\Components\Radio::make('is_bye')->label('Is Bye')->default(false)->boolean(),

            Forms\Components\Select::make('left_lane_participant_id')
                ->options($this->participantOptions())
                ->nullable()
                ->searchable()
                ->columnSpanFull()
                ->label('Left Lane Participant'),

            Forms\Components\Select::make('right_lane_participant_id')
                ->options($this->participantOptions())
                ->nullable()
                ->searchable()
                ->label('Right Lane Participant')
                ->columnSpanFull(),

            Forms\Components\Select::make('status')->options(RaceStatus::class),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('number')
            ->columns([
                Tables\Columns\TextColumn::make('number')->numeric()->prefix('#')->sortable(),
                Tables\Columns\TextColumn::make('leftLaneParticipant.title')
                    ->description(fn (?Race $record) => $record->leftLaneParticipant->boat->village->name)
                    ->badge()
                    ->color(function (Race $record): string {
                        return $this->setBadgeColor($record, 'left_lane_participant_id');
                    })
                    ->action(
                        Action::make('Select left lane as Winner')
                            ->requiresConfirmation()
                            ->modalDescription('Are you sure you want to select this participant as the winner?')
                            ->action(fn (Race $record) => $record->setWinner($record->left_lane_participant_id))
                    ),
                Tables\Columns\TextColumn::make('rightLaneParticipant.title')
                    ->description(fn (?Race $record) => $record->rightLaneParticipant?->boat->village->name)
                    ->badge()
                    ->color(function (Race $record): string {
                        return $this->setBadgeColor($record, 'right_lane_participant_id');
                    })
                    ->action(
                        Action::make('Select right lane as Winner')
                            ->requiresConfirmation()
                            ->modalDescription('Are you sure you want to select this participant as the winner?')
                            ->action(fn (Race $record) => $record->setWinner($record->right_lane_participant_id))
                    ),
                Tables\Columns\TextColumn::make('status')->badge(),
            ])
            ->filters([Tables\Filters\TrashedFilter::make()])
            ->headerActions([Tables\Actions\CreateAction::make()])
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
            ->modifyQueryUsing(
                fn (Builder $query) => $query
                    ->with([
                        'leftLaneParticipant.boat',
                        'leftLaneParticipant.sponsors',
                        'leftLaneParticipant.boat.village',
                        'rightLaneParticipant.boat',
                        'rightLaneParticipant.sponsors',
                        'rightLaneParticipant.boat.village',
                    ])
                    ->withoutGlobalScopes([SoftDeletingScope::class])
            );
    }

    protected function participantOptions(): array
    {
        return $this->getOwnerRecord()
            ->day->event->participants->load(['boat', 'sponsors'])
            ->pluck('title', 'id')
            ->toArray();
    }

    protected function setBadgeColor(Race $record, string $column): string
    {
        if ($record->winner_id === null) {
            return 'gray';
        }

        return $record->winner_id === $record->{$column}
            ? 'success' // Green for winner
            : 'danger'; // Red for loser
    }
}
