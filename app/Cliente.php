<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
     protected $table = 'clientes';
	
    protected $fillable=[
       'nombre','telefono','nit','precio_venta','tiempo','estado',
   ];
}
