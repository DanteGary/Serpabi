<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alquiler extends Model
{
    protected $table = 'alquileres';
	
    protected $fillable=[
       'costo','feha_inicio','feha_fin','id_cliente',
   ];
}
