<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
	protected $table = 'ventas';
    protected $fillable=[
       'fecha','cantidad','id_materiales','id_productos',
   ];	
}
