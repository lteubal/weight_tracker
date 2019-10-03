<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('last_name')->after('name');   
            $table->decimal('desired_weight',8,2)->default(0);
            $table->decimal('height_in_inches',8,2)->default(0);
            $table->enum('gender', ['male', 'female',' - '])->default(' - '); 
            $table->dateTime('birthdate')->default(\Carbon\Carbon::now());
            $table->smallInteger('activity_level')->default(50);
            $table->enum('system', ['Standard', 'Metric'])->default('Standard'); 
            $table->string('avatar')->default('');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
