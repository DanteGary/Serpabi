<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Mora;
use Illuminate\Http\Request;

use DB;

class MoraController extends Controller
{   
    public function myMora(Request $request) {
      $moras = Mora::paginate(2);
        if($request->ajax()){
            return response()->json(view('mora.moras',compact('moras')->render()));
        }else{
          return view('mora.my-moras',compact('moras'));
        }
    }

    public function index()
    {
       $mor=\DB::select('SELECT moras.*,clientes.nombre nombrecliente,clientes.id id_cli FROM moras, clientes WHERE moras.id_cliente=clientes.id');

        $moraS=["current_page"=>1, 'data'=>$mor, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($moraS);
        return($jsondata);   
   }

    public function myMoras() {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();

        return view('mora.my-moras', compact('clientes'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
          $mora=Mora::create($request->all());
       return response()->json($mora);
    }


    public function show(Mora $mora)
    {
        //
    }


    public function edit(Mora $mora)
    {
        //
    }


    public function update(Request $request,$id)
    {
        $mora=Mora::find($id)->update($request->all());
       return response()->json($mora);
    }

    public function destroy($id)
    {
         $mora=Mora::find($id);
       $mora->delete();
       return response()->json($mora);
    }
}
