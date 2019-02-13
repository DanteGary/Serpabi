<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlquilerProducto extends Model
{
    protected $table = 'alquileres_productos';
	
    protected $fillable=[
       'costo_producto','feha_inicio','feha_fin','cantidad','id_cliente','id_producto',
   ];
}
