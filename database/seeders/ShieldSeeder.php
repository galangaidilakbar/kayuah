<?php

namespace Database\Seeders;

use BezhanSalleh\FilamentShield\Support\Utils;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesWithPermissions = '[{"name":"super_admin","guard_name":"web","permissions":["view_boat","view_any_boat","create_boat","update_boat","restore_boat","restore_any_boat","replicate_boat","reorder_boat","delete_boat","delete_any_boat","force_delete_boat","force_delete_any_boat","view_day","view_any_day","create_day","update_day","restore_day","restore_any_day","replicate_day","reorder_day","delete_day","delete_any_day","force_delete_day","force_delete_any_day","view_district","view_any_district","create_district","update_district","restore_district","restore_any_district","replicate_district","reorder_district","delete_district","delete_any_district","force_delete_district","force_delete_any_district","view_event","view_any_event","create_event","update_event","restore_event","restore_any_event","replicate_event","reorder_event","delete_event","delete_any_event","force_delete_event","force_delete_any_event","view_role","view_any_role","create_role","update_role","delete_role","delete_any_role","view_round","view_any_round","create_round","update_round","restore_round","restore_any_round","replicate_round","reorder_round","delete_round","delete_any_round","force_delete_round","force_delete_any_round","view_sponsor","view_any_sponsor","create_sponsor","update_sponsor","restore_sponsor","restore_any_sponsor","replicate_sponsor","reorder_sponsor","delete_sponsor","delete_any_sponsor","force_delete_sponsor","force_delete_any_sponsor","view_sub::district","view_any_sub::district","create_sub::district","update_sub::district","restore_sub::district","restore_any_sub::district","replicate_sub::district","reorder_sub::district","delete_sub::district","delete_any_sub::district","force_delete_sub::district","force_delete_any_sub::district","view_venue","view_any_venue","create_venue","update_venue","restore_venue","restore_any_venue","replicate_venue","reorder_venue","delete_venue","delete_any_venue","force_delete_venue","force_delete_any_venue","view_village","view_any_village","create_village","update_village","restore_village","restore_any_village","replicate_village","reorder_village","delete_village","delete_any_village","force_delete_village","force_delete_any_village"]}]';
        $directPermissions = '[]';

        static::makeRolesWithPermissions($rolesWithPermissions);
        static::makeDirectPermissions($directPermissions);

        $this->command->info('Shield Seeding Completed.');
    }

    protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
    {
        if (! blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
            /** @var Model $roleModel */
            $roleModel = Utils::getRoleModel();
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($rolePlusPermissions as $rolePlusPermission) {
                $role = $roleModel::firstOrCreate([
                    'name' => $rolePlusPermission['name'],
                    'guard_name' => $rolePlusPermission['guard_name'],
                ]);

                if (! blank($rolePlusPermission['permissions'])) {
                    $permissionModels = collect($rolePlusPermission['permissions'])
                        ->map(fn ($permission) => $permissionModel::firstOrCreate([
                            'name' => $permission,
                            'guard_name' => $rolePlusPermission['guard_name'],
                        ]))
                        ->all();

                    $role->syncPermissions($permissionModels);
                }
            }
        }
    }

    public static function makeDirectPermissions(string $directPermissions): void
    {
        if (! blank($permissions = json_decode($directPermissions, true))) {
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($permissions as $permission) {
                if ($permissionModel::whereName($permission)->doesntExist()) {
                    $permissionModel::create([
                        'name' => $permission['name'],
                        'guard_name' => $permission['guard_name'],
                    ]);
                }
            }
        }
    }
}
