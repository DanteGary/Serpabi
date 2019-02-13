<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cargos extends Model
{
    protected $table = 'cargos';
	
    protected $fillable=[
       'nombre','descripcion',
   ];
}
