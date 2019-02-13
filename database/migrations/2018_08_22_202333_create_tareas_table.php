<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTareasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->integer('total');
            $table->double('avance');
            $table->integer('id_estado')->unsigned()->nullable();
            $table->integer('id_producto')->unsigned()->nullable();
            $table->integer('id_proyecto')->unsigned()->nullable();
            $table->timestamps();
            
            $table->foreign('id_producto')
                  ->references('id')->on('productos')
                  ->onDelete('no action');

            $table->foreign('id_estado')
                  ->references('id')->on('estado_tareas')
                  ->onDelete('no action');

            $table->foreign('id_proyecto')
                  ->references('id')->on('proyectos')
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
        Schema::dropIfExists('tareas');
    }
}
