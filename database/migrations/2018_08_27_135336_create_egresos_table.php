<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEgresosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('egresos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('motivo');
            $table->date('fecha');
            $table->integer('id_compra')->unsigned();
            $table->timestamps();

            $table->foreign('id_compra')
                  ->references('id')->on('compras')
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
        Schema::dropIfExists('egresos');
    }
}
