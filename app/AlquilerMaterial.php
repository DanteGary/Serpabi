<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlquilerMaterial extends Model
{
    protected $table = 'alquiler_materiales';
	
    protected $fillable=[
       'costo_alquiler','feha_inicio','feha_fin','cantidad','id_cliente','id_material',
   ];
}
