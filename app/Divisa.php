<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Divisa extends Model
{
    protected $table = 'divisas';
	
    protected $fillable=[
       'nombre_bolivianos','simbolo_bolivianos',
   ];
}