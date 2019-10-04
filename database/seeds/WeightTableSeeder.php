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
        $count = 35;
        factory(Weight::class, $count)->create(); 
    }
}
