<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Movimiento;
use Illuminate\Http\Request;

use DB;

class MovimientoController extends Controller
{
    public function myMovimiento(Request $request) {
      $movimientos = Movimiento::paginate(2);
        if($request->ajax()){
            return response()->json(view('movimiento.movimientos',compact('movimientos')->render()));
        }else{
          return view('movimiento.my-movimientos',compact('movimientos'));
        }
    }

    public function index()
    {
        $movi=\DB::select('SELECT movimientos.*,tipos.id id_tipo,tipos.entrada entradatipo, cuentas.nombre nombrecuenta, cuentas.id id_cue FROM movimientos, tipos, cuentas WHERE movimientos.id_tipo=tipos.id AND movimientos.id_cuenta=cuentas.id');

        $movimientoS=["current_page"=>1, 'data'=>$movi, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($movimientoS);
        return($jsondata);
    }

    public function myMovimientos(Request $request) {
        $cuentas=\DB::table('cuentas')
        ->select('*')
        ->get();
        $tipos=\DB::table('tipos')
        ->select('*')
        ->get();

        return view('movimiento.my-movimientos', compact('cuentas'))
        ->with('tipos',$tipos);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
         $movimiento=Movimiento::create($request->all());
       return response()->json($movimiento);
    }


    public function show(Movimiento $movimiento)
    {
        //
    }


    public function edit(Movimiento $movimiento)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $movimiento=Movimiento::find($id)->update($request->all());
       return response()->json($movimiento);
    }


    public function destroy($id)
    {
         $movimiento=Movimiento::find($id);
       $movimiento->delete();
       return response()->json($movimiento);
    }
}
