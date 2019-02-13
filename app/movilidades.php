<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class movilidades extends Model
{
    protected $table = 'movilidades';
	
    protected $fillable=[
       'placa','descripcion','id_empleados', 'estado',
   ];
}
