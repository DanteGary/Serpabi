<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\ubicaciones;
use Illuminate\Http\Request;

use DB;

class UbicacionesController extends Controller
{
   
   public function myUbicacion(Request $request) {
       $ubicaciones = ubicaciones::paginate(20);
        if($request->ajax()){
            return response()->json(view('ubicacion.ubicaciones',compact('ubicaciones')->render()));
        }else{
          
        return view('ubicacion.my-ubicaciones',compact('ubicaciones'));
        }
    }

    public function index()
    {
         $ubicacion=\DB::select('SELECT ubicaciones.*,movilidades.placa placamovilidad,movilidades.id id_movi, clientes.nombre nombrecli, clientes.id id_cli FROM ubicaciones, movilidades, clientes WHERE ubicaciones.id_movilidad=movilidades.id AND ubicaciones.id_cliente=clientes.id');

        $ubic=["current_page"=>1, 'data'=>$ubicacion, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ubic);
        return($jsondata);
    }

     public function myUbicacionesN() {
        $movili=\DB::table('movilidades')
        ->select('*')
        ->get();
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();

        return view('ubicacion.my-ubicaciones', compact('movili'))
        ->with('clientes',$clientes);
    }
  
    public function create()
    {
        //
    }

  
    public function store(Request $request)
    {
        $ubicacion=ubicaciones::create($request->all());
        return response()->json($ubicacion);
    }

 
    public function show(ubicaciones $ubicaciones)
    {
        //
    }

 
    public function edit(ubicaciones $ubicaciones)
    {
        //
    }

  
    public function update(Request $request, $id)
    {
        $ubicacion=ubicaciones::find($id)->update($request->all());
       return response()->json($ubicacion);
    }

 
    public function destroy($id)
    {
         $ubicacion=ubicaciones::find($id);
        $ubicacion->delete();
        return response()->json($ubicacion);
    }
}
