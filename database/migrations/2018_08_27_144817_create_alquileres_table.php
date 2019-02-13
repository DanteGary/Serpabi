<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlquileresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alquileres', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('costo');
            $table->date('feha_inicio');
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->timestamps();
            $table->date('feha_fin')->default(date('Y-m-d'));

            $table->foreign('id_cliente')
                  ->references('id')->on('clientes')
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
        Schema::dropIfExists('alquileres');
    }
}
