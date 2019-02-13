<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UbicacionCliente extends Model
{
    protected $table = 'ubicacion_clientes';
	
    protected $fillable=[
       'latitud','longitud','id_cliente',
   ];
}
