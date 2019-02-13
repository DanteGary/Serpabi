<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUbicacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->double('latitud');
            $table->double('longitud');
            $table->integer('id_movilidad')->unsigned()->nullable();
            $table->integer('id_cliente')->unsigned()->nullable();
            $table->timestamps();

            
            $table->foreign('id_movilidad')
                  ->references('id')->on('movilidades')
                  ->onDelete('no action');

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
        Schema::dropIfExists('ubicaciones');
    }
}
