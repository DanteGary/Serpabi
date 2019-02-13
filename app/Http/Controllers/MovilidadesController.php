<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\movilidades;
use Illuminate\Http\Request;

use DB;

class MovilidadesController extends Controller
{

    public function myMovilidad(Request $request) {
       $movilidades = movilidades::paginate(20);
        if($request->ajax()){
            return response()->json(view('movilidad.movilidades',compact('movilidades')->render()));
        }else{
          
        return view('movilidad.my-movilidades',compact('movilidades'));
        }
    }

    public function index()
    {
       $movilidades=\DB::select('SELECT movilidades.*,empleados.nombre nombreempleado,empleados.id id_empl FROM movilidades, empleados WHERE movilidades.id_empleados=empleados.id');

        $movli=["current_page"=>1, 'data'=>$movilidades, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($movli);
        return($jsondata);
    }

     public function myMovilidadesM() {
         $employee=\DB::table('empleados')
        ->select('*')
        ->get();

        return view('movilidad.my-movilidades', compact('employee'));
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $movilidad=movilidades::create($request->all());
        return response()->json($movilidad);
    }

 
    public function show(movilidades $movilidades)
    {
        //
    }


    public function edit(movilidades $movilidades)
    {
        //
    }


    public function update(Request $request, $id)
    {
         $movilidad=movilidades::find($id)->update($request->all());
       return response()->json($movilidad);
    }


    public function destroy($id)
    {
         $movilidad=movilidades::find($id);
        $movilidad->delete();
        return response()->json($movilidad);
    }
}
