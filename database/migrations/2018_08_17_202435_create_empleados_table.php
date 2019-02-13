<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmpleadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->integer('telefono');
            $table->integer('ci_nit');
            $table->integer('estado');
            $table->integer('id_cargos')->unsigned()->nullable();
            $table->timestamps();
            
           
            $table->foreign('id_cargos')
                  ->references('id')->on('cargos')
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
        Schema::dropIfExists('empleados');
    }
}
