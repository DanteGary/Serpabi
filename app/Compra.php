<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $table = 'compras';
	
    protected $fillable=[
       'fecha','cantidad','costo_total','costo_unitario','id_material','id_proveedor',
   ];
}
