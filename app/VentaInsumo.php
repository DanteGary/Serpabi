<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VentaInsumo extends Model
{
    protected $table = 'ventas_insumos';
	
    protected $fillable=[
       'costo_venta','fecha_venta','cantidad','id_cliente','id_material',
   ];
}
