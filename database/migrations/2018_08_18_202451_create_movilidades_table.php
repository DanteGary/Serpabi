<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovilidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movilidades', function (Blueprint $table) {
            $table->increments('id');
            $table->string('placa');
            $table->string('descripcion');
            $table->string('estado');
            $table->integer('id_empleados')->unsigned()->nullable();
            $table->timestamps();
            
           
            $table->foreign('id_empleados')
                  ->references('id')->on('empleados')
                  ->onDelete('no action');
         

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movilidades');
    }
}
