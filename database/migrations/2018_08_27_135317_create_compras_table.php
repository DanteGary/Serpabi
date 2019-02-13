<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComprasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->increments('id');
            $table->date('fecha');
            $table->integer('cantidad');
            $table->double('costo_total');
            $table->double('costo_unitario');
            $table->integer('id_material')->unsigned();
            $table->integer('id_proveedor')->unsigned();
            $table->timestamps();

            $table->foreign('id_material')
                  ->references('id')->on('materiales_insumos')
                  ->onDelete('no action');

            $table->foreign('id_proveedor')
                  ->references('id')->on('proveedores')
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
        Schema::dropIfExists('compras');
    }
}
