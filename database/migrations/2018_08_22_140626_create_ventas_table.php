<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->increments('id');
            $table->date('fecha');
            $table->integer('cantidad');
            $table->integer('id_materiales')->unsigned();
             $table->integer('id_productos')->unsigned();
            $table->timestamps();
            $table->foreign('id_materiales')
                  ->references('id')->on('materiales_insumos')
                  ->onDelete('no action')
                  ->onUpdate('cascade');
            $table->foreign('id_productos')
                  ->references('id')->on('productos')
                  ->onDelete('no action')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ventas');
    }
}
