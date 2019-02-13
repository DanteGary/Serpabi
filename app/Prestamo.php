<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prestamo extends Model
{
    protected $table = 'ubicaciones';
	
    protected $fillable=[
       'descripcion','fecha','cantidad','estado','id_cliente','id_insumo',
   ];
}
