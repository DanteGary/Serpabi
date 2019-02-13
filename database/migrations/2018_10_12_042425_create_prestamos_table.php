<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrestamosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prestamos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('descripcion');
            $table->date('fecha');
            $table->integer('cantidad');
            $table->string('estado');
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->integer('id_insumo')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_cliente')
                  ->references('id')->on('clientes')
                  ->onDelete('no action');

            $table->foreign('id_insumo')
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
        Schema::dropIfExists('prestamos');
    }
}
