<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ubicaciones extends Model
{
    protected $table = 'ubicaciones';
	
    protected $fillable=[
       'latitud','longitud','id_movilidad','id_cliente',
   ];
}
