<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlquilerMaterialesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alquiler_materiales', function (Blueprint $table) {
            $table->increments('id');
            $table->double('costo_alquiler');
            $table->date('feha_inicio');
            $table->date('feha_fin');
            $table->integer('cantidad');
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->integer('id_material')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_cliente')
                  ->references('id')->on('clientes')
                  ->onDelete('no action');

            $table->foreign('id_material')
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
        Schema::dropIfExists('alquiler_materiales');
    }
}
