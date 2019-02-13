<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Cuenta;
use Illuminate\Http\Request;

use DB;

class CuentaController extends Controller
{
    
    public function myCuenta(Request $request) {
       $cuentas = Cuenta::paginate(2);
        if($request->ajax()){
            return response()->json(view('cuenta.cuentas',compact('cuentas')->render()));
        }else{
          return view('cuenta.my-cuentas',compact('cuentas'));
        }
    }

    public function index()
    {
         $cuenta=DB::table('cuentas')
           ->select('*')
           ->paginate(1000);
       return response()->json($cuenta);
    }


    public function cuentas(Request $request) {
        $cuentas = Cuenta::paginate(2);
        if($request->ajax()){
            return response()->json(view('cuenta.cuentas',compact('cuentas')->render()));
        }
        return view('cuenta.my-cuentas',compact('cuentas'));
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $cuenta=Cuenta::create($request->all());
       return response()->json($cuenta);
    }


    public function show(Cuenta $cuenta)
    {
        //
    }


    public function edit(Cuenta $cuenta)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $cuenta=Cuenta::find($id)->update($request->all());
       return response()->json($cuenta);
    }


    public function destroy($id)
    {
        $cuenta=Cuenta::find($id);
       $cuenta->delete();
       return response()->json($cuenta);
    }
}
