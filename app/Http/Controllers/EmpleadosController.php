<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\empleados;
use Illuminate\Http\Request;

use DB;

class EmpleadosController extends Controller
{
   
   public function myEmpleado(Request $request) {
       $empleados = empleados::paginate(20);
        if($request->ajax()){
            return response()->json(view('empleado.empleados',compact('empleados')->render()));
        }else{
          
        return view('empleado.my-empleados',compact('empleados'));
        }
    }

    public function index()
    {
        $empleado=\DB::select('SELECT empleados.*,cargos.nombre nombrecargo,cargos.id id_car FROM empleados, cargos WHERE empleados.id_cargos=cargos.id');

        $empleadoC=["current_page"=>1, 'data'=>$empleado, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($empleadoC);
        return($jsondata);
    }

    public function myEmpleados() {
        $cargos1=\DB::table('cargos')
        ->select('*')
        ->get();

        return view('empleado.my-empleados', compact('cargos1'));
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $empleado=empleados::create($request->all());
        return response()->json($empleado);
    }

 
    public function show(empleados $empleados)
    {
        //
    }

    public function edit(empleados $empleados)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $empleado=empleados::find($id)->update($request->all());
       return response()->json($empleado);
    }

    public function destroy($id)
    {
        $empleado=empleados::find($id);
        $empleado->delete();
        return response()->json($empleado);
    }
}
