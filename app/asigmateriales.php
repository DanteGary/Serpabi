<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class asigmateriales extends Model
{
   protected $table = 'asigmateriales';
	
    protected $fillable=[
       'id_tareas','id_materiales_insumos',
   ];
}
