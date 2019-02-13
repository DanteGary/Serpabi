<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AsignarEmpleado extends Model
{
    protected $table = 'asignar_empleados';
	
    protected $fillable=[
       'id_empleado','id_tarea',
   ];

}
