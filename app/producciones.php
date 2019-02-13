<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class producciones extends Model
{
    protected $table = 'producciones';
	
    protected $fillable=[
       'descripcion','fecha_produccion','cantidad','id_producto','id_empleado',
   ];
}
