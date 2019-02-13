<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsigmaterialesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asigmateriales', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_tareas')->unsigned()->nullable();
            $table->integer('id_materiales_insumos')->unsigned()->nullable();

            $table->foreign('id_tareas')
                  ->references('id')->on('tareas')
                  ->onDelete('no action');
         
            $table->foreign('id_materiales_insumos')
                  ->references('id')->on('materiales_insumos')
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
        Schema::dropIfExists('asigmateriales');
    }
}
