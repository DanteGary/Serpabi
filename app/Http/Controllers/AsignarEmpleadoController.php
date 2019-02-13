<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\AsignarEmpleado;
use Illuminate\Http\Request;

use DB;

class AsignarEmpleadoController extends Controller
{
 
    public function myAsignarEmpleado() {
       return view('asignarEmpleado.my-asignarEmpleados');
    }

    public function index()
    {
        $asignarEmpleado=DB::table('asignar_empleados')
           ->select('*')
           ->paginate(1000);
       return response()->json($asignarEmpleado);
    }

    public function asignarEmpleados(Request $request) {
        $asignarEmpleado = AsignarEmpleado::paginate(2);
        if($request->ajax()){
            return response()->json(view('asignarEmpleado.asignarEmpleados',compact('asignarEmpleados')->render()));
        }
        return view('asignarEmpleado.my-asignarEmpleados',compact('asignarEmpleados'));
    }
  
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show(AsignarEmpleado $asignarEmpleado)
    {
        //
    }

    public function edit(AsignarEmpleado $asignarEmpleado)
    {
        //
    }

    public function update(Request $request, AsignarEmpleado $asignarEmpleado)
    {
        //
    }


    public function destroy(AsignarEmpleado $asignarEmpleado)
    {
        //
    }
}
