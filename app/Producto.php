<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
	protected $table = 'productos'; 
    protected $fillable=[
       'nombre','descripcion','cantidad','preciov','id_produccion',
    ];
}
