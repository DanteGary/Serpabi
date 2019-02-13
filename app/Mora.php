<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mora extends Model
{
     protected $table = 'moras';
	
    protected $fillable=[
       'motivo','monto','id_cliente',
   ];
}
