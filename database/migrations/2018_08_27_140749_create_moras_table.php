<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMorasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moras', function (Blueprint $table) {
            $table->increments('id');
            $table->string('motivo');
            $table->integer('monto');
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
        Schema::dropIfExists('moras');
    }
}
