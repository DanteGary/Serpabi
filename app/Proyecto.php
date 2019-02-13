<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $table = 'proyectos';

    protected $fillable=[
       'nombre','fecha_inicio','fecha_fin','avance','id_estado',
   ];
}
