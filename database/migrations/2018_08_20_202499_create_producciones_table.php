<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProduccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('descripcion');
            $table->date('fecha_produccion');
            $table->integer('cantidad');
            $table->integer('id_producto')->unsigned()->nullable();
            $table->integer('id_empleado')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_producto')
                  ->references('id')->on('productos')
                  ->onDelete('no action');

            $table->foreign('id_empleado')
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
        Schema::dropIfExists('producciones');
    }
}
