<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DayResource\Pages;
use App\Filament\Resources\DayResource\RelationManagers\RoundsRelationManager;
use App\Models\Day;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DayResource extends Resource
{
    protected static ?string $model = Day::class;

    protected static ?string $navigationIcon = 'heroicon-o-sun';

    public static function getNavigationGroup(): ?string
    {
        return __('filament/navigation.group.schedules');
    }

    public static function getNavigationLabel(): string
    {
        return __('filament/resources.day.label.plural');
    }

    public static function getModelLabel(): string
    {
        return __('filament/resources.day.label.singular');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament/resources.day.label.plural');
    }

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('event_id')
                    ->relationship('event', 'name')
                    ->required(),
                Forms\Components\DatePicker::make('date')
                    ->required(),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('event.name'),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RoundsRelationManager::class,
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDays::route('/'),
            'create' => Pages\CreateDay::route('/create'),
            'view' => Pages\ViewDay::route('/{record}'),
            'edit' => Pages\EditDay::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
