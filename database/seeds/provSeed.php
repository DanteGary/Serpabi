<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class provSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $faker = Faker::create();
       DB::table('proveedores')->insert([
       	'nombre' => 'No Proveedor',
       	'nit' => 00000000,
        'telefono' => 000000,
       ]);
    }
}
