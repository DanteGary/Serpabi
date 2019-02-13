<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class tareas extends Model
{
    protected $table = 'tareas';
	
    protected $fillable=[
       'nombre','fecha_inicio','fecha_fin','estado','total','avance','id_estado','id_producto','id_proyecto',
   ];
}
