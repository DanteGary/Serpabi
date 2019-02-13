<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignarEmpleadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignar_empleados', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_empleado')->unsigned()->nullable();
            $table->integer('id_tarea')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_empleado')
                  ->references('id')->on('empleados')
                  ->onDelete('no action');

            $table->foreign('id_tarea')
                  ->references('id')->on('tareas')
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
        Schema::dropIfExists('asignar_empleados');
    }
}
