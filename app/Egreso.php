<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Egreso extends Model
{
    protected $table = 'egresos';
	
    protected $fillable=[
       'motivo','fecha','id_compra',
   ];
}
