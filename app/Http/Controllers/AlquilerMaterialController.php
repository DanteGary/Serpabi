<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\AlquilerMaterial;
use Illuminate\Http\Request;

use DB;

class AlquilerMaterialController extends Controller
{
      public function myAlquilerMaterial(Request $request) {
       $alquileresMateriales = AlquilerMaterial::paginate(20);
        if($request->ajax()){
            return response()->json(view('alquilerMaterial.alquileresMateriales',compact('alquileresMateriales')->render()));
        }else{
          
        return view('alquilerMaterial.my-alquileresMateriales',compact('alquileresMateriales'));
        }
    }

    public function index()
    {
        $alquiMa=\DB::select('SELECT alquiler_materiales.*,clientes.id id_cliente,clientes.nombre nombrecli, materiales_insumos.nombre nombreMatInsu, materiales_insumos.id id_material FROM alquiler_materiales, clientes, materiales_insumos WHERE alquiler_materiales.id_cliente=clientes.id AND alquiler_materiales.id_material=materiales_insumos.id');

        $alquiMate=["current_page"=>1, 'data'=>$alquiMa, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($alquiMate);
        return($jsondata);
    }

    public function myAlquileresMateriales(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();
        $materiales_insumos=\DB::table('materiales_insumos')
        ->select('*')
        ->get();

        return view('alquilerMaterial.my-alquileresMateriales', compact('clientes'))
        ->with('materiales_insumos',$materiales_insumos);
    }
   
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $alquilerMaterial=AlquilerMaterial::create($request->all());
        return response()->json($alquilerMaterial);
    }

 
    public function show(AlquilerMaterial $alquilerMaterial)
    {
        //
    }


    public function edit(AlquilerMaterial $alquilerMaterial)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $alquilerMaterial=AlquilerMaterial::find($id)->update($request->all());
       return response()->json($alquilerMaterial);
    }

 
    public function destroy($id)
    {
        $alquilerMaterial=AlquilerMaterial::find($id);
        $alquilerMaterial->delete();
        return response()->json($alquilerMaterial);
    }
}
