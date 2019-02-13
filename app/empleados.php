<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class empleados extends Model
{
    protected $table = 'empleados';
	
    protected $fillable=[
       'nombre','telefono','ci_nit','estado','id_cargos',
   ];
}
