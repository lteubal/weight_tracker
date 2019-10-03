<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $count = 1;
        factory(User::class, $count)->create([
            'name' => 'demo',
            'last_name' => 'demo',
            'email' => 'demo@demo.com',
            'password' => '$2y$10$wGb49IAG7rEjVtEvM1RYlewRCI.4aO1wLSSNBkt0SqmHUmUJL6Jm6',
        ]); 
    }
}
