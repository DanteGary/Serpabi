<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Saldo;
use Illuminate\Http\Request;

use DB;

class SaldoController extends Controller
{
      public function mySaldo(Request $request) {
      $saldos = Saldo::paginate(2);
        if($request->ajax()){
            return response()->json(view('saldo.saldos',compact('saldos')->render()));
        }else{
          return view('saldo.my-saldos',compact('saldos'));
        }
    }
 
    public function index()
    {
        $sal=\DB::select('SELECT saldos.*,cuentas.nombre nombrecuenta,cuentas.id id_cue, divisas.nombre_bolivianos nombredivisa, divisas.id id_divisa FROM saldos, cuentas, divisas WHERE saldos.id_cuenta=cuentas.id AND saldos.id_divisa=divisas.id');

        $saldoS=["current_page"=>1, 'data'=>$sal, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($saldoS);
        return($jsondata);
    }

    public function mySaldos() {
       $cuentas=\DB::table('cuentas')
        ->select('*')
        ->get();
        $divisas=\DB::table('divisas')
        ->select('*')
        ->get();

        return view('saldo.my-saldos', compact('cuentas'))
        ->with('divisas',$divisas);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
         $saldo=Saldo::create($request->all());
       return response()->json($saldo);
    }


    public function show(Saldo $saldo)
    {
        //
    }


    public function edit(Saldo $saldo)
    {
        //
    }


    public function update(Request $request, $id)
    {
         $saldo=Saldo::find($id)->update($request->all());
       return response()->json($saldo);
    }


    public function destroy($id)
    {
       $saldo=Saldo::find($id);
       $saldo->delete();
       return response()->json($saldo);
    }
}
