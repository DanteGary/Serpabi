<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlquileresProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alquileres_productos', function (Blueprint $table) {
            $table->increments('id');
            $table->double('costo_producto');
            $table->date('feha_inicio');
            $table->date('feha_fin');
            $table->integer('cantidad');
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->integer('id_producto')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_cliente')
                  ->references('id')->on('clientes')
                  ->onDelete('no action');

            $table->foreign('id_producto')
                  ->references('id')->on('productos')
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
        Schema::dropIfExists('alquileres_productos');
    }
}
