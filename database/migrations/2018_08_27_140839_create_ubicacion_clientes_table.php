<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUbicacionClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubicacion_clientes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('latitud');
            $table->string('longitud');
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->timestamps();

            
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
        Schema::dropIfExists('ubicacion_clientes');
    }
}
