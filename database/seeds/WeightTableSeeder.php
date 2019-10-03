<?php

use Illuminate\Database\Seeder;
use App\Weight;

class WeightTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\Weight::truncate();
        $count = 100;
        factory(Weight::class, $count)->create(); 
    }
}
