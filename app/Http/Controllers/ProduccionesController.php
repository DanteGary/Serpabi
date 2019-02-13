<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\producciones;
use Illuminate\Http\Request;

use DB;

class ProduccionesController extends Controller
{
    
     public function myProduccion(Request $request) {
       $producciones = producciones::paginate(20);
        if($request->ajax()){
            return response()->json(view('produccion.producciones',compact('producciones')->render()));
        }else{
          
        return view('produccion.my-producciones',compact('producciones'));
        }
    }

    public function index()
    {
        $pro=\DB::select('SELECT producciones.*,empleados.nombre nombreEmpleado,empleados.id id_emp, productos.nombre nombreprod, productos.id id_prod FROM producciones, empleados, productos WHERE producciones.id_empleado=empleados.id AND producciones.id_producto=productos.id');

        $produ=["current_page"=>1, 'data'=>$pro, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($produ);
        return($jsondata);
    }

    public function myProduccionesM() {
        $empleados=\DB::table('empleados')
        ->select('*')
        ->get();
        $productos=\DB::table('productos')
        ->select('*')
        ->get();

        return view('produccion.my-producciones', compact('empleados'))
        ->with('productos',$productos);
    }
 
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $produccion=producciones::create($request->all());
        return response()->json($produccion);
    }


    public function show(producciones $producciones)
    {
        //
    }


    public function edit(producciones $producciones)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $produccion=producciones::find($id)->update($request->all());
       return response()->json($produccion);
    }


    public function destroy($id)
    {
       $produccion=producciones::find($id);
        $produccion->delete();
        return response()->json($produccion);
    }
}
