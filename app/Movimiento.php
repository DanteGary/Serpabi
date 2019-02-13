<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    protected $table = 'movimientos';
	
    protected $fillable=[
       'monto','fecha','motivo','id_tipo','id_cuenta',
   ];
}
