<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Egreso;
use Illuminate\Http\Request;

use DB;

class EgresoController extends Controller
{

     public function myEgreso(Request $request) {
      $egresos = Egreso::paginate(2);
        if($request->ajax()){
            return response()->json(view('egreso.egresos',compact('egresos')->render()));
        }else{
          return view('egreso.my-egresos',compact('egresos'));
        }
    }

    public function index()
    {
         $egre=\DB::select('SELECT egresos.*,compras.fecha fechacompra,compras.id id_com FROM egresos, compras WHERE egresos.id_compra=compras.id');

        $egresoS=["current_page"=>1, 'data'=>$egre, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($egresoS);
        return($jsondata);
    }

    public function myEgresos(Request $request) {
        $compras=\DB::table('compras')
        ->select('*')
        ->get();

        return view('egreso.my-egresos', compact('compras'));
    }
    
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $egreso=Egreso::create($request->all());
       return response()->json($egreso);
    }


    public function show(Egreso $egreso)
    {
        //
    }

    public function edit(Egreso $egreso)
    {
        //
    }

    public function update(Request $request, $id)
    {
         $egreso=Egreso::find($id)->update($request->all());
       return response()->json($egreso);
    }

    public function destroy($id)
    {
        $egreso=Egreso::find($id);
       $egreso->delete();
       return response()->json($egreso);
    }
}
