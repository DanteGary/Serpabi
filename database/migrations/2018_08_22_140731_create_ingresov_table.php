<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngresovTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingresov', function (Blueprint $table) {
            $table->increments('id');
            $table->string('motivo');
            $table->date('fecha');
            $table->integer('id_ventas')->unsigned();
            $table->timestamps();
            $table->foreign('id_ventas')
                  ->references('id')->on('ventas')
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
        Schema::dropIfExists('ingresov');
    }
}
