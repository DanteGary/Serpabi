<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingresov extends Model
{
	protected $table = 'ingresov';
	
    protected $fillable=[
       'motivo','fecha','id_ventas',
   ];
}
