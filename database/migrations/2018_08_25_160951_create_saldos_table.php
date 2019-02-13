<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSaldosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('saldos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('monto');
            $table->integer('id_cuenta')->unsigned()->nullable();
            $table->integer('id_divisa')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('id_cuenta')
                  ->references('id')->on('cuentas')
                  ->onDelete('no action');

            $table->foreign('id_divisa')
                  ->references('id')->on('divisas')
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
        Schema::dropIfExists('saldos');
    }
}
