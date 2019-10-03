<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Weight;
use Faker\Generator as Faker;

$factory->define(Weight::class, function (Faker $faker) {
    return [
        'user_id' => 1,        
        'date' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now'),
        'weight' => $faker->numberBetween(1200, 1570) / 10
      
    ];
});
