<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Admin::create([
            'name' => 'admin4',
            'email' => 'admin4@example.com',
            'password' => Hash::make('password'),
            // Add any other admin attributes as needed
        ]);
        $admin->assignRole('Super Admin');
    }
}
