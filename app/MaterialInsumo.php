<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialInsumo extends Model
{
	protected $table = 'materiales_insumos'; 
	
     protected $fillable=[
       'nombre','descripcion','cantidad_total','cantidad_minima','estado','precio_compra',
   ];
}
