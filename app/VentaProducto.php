<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VentaProducto extends Model
{
    protected $table = 'ventas_productos';
	
    protected $fillable=[
       'costo_venta','fecha_venta','cantidad','id_cliente','id_producto',
   ];
}
