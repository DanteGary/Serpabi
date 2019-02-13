<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Alquiler;
use Illuminate\Http\Request;

use DB;

class AlquilerController extends Controller
{

    public function myAlquiler(Request $request) {
       $alquileres = Alquiler::paginate(20);
        if($request->ajax()){
            return response()->json(view('alquiler.alquileres',compact('alquileres')->render()));
        }else{
          
        return view('alquiler.my-alquileres',compact('alquileres'));
        }
    }

    public function index()
    {
        $alqui=\DB::select('SELECT alquileres.*,clientes.nombre nombrecli,clientes.id id_cli FROM alquileres, clientes WHERE alquileres.id_cliente=clientes.id');

        $alquilereS=["current_page"=>1, 'data'=>$alqui, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($alquilereS);
        return($jsondata);
    }

    public function myAlquileres(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();

        return view('alquiler.my-alquileres', compact('clientes'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $alquiler=Alquiler::create($request->all());
        return response()->json($alquiler);
    }

    public function show(Alquiler $alquiler)
    {
        //
    }

    public function edit(Alquiler $alquiler)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $alquiler=Alquiler::find($id)->update($request->all());
       return response()->json($alquiler);
    }

    public function destroy($id)
    {
        $alquiler=Alquiler::find($id);
        $alquiler->delete();
        return response()->json($alquiler);
    }
}
