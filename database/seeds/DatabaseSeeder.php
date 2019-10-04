<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Weight;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\Weight::truncate(); 

        $this->call(UserTableSeeder::class);
        $this->call(WeightTableSeeder::class);
 
    }
}
