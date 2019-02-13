<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\UbicacionCliente;
use Illuminate\Http\Request;

use DB;

class UbicacionClienteController extends Controller
{
  public function myUbicacionCliente(Request $request) {
      $ubicacionesClientes = UbicacionCliente::paginate(2);
        if($request->ajax()){
            return response()->json(view('ubicacionCliente.ubicacionesClientes',compact('ubicacionesClientes')->render()));
        }else{
          return view('ubicacionCliente.my-ubicacionesClientes',compact('ubicacionesClientes'));
        }
    }

    public function index()
    {
        $ubiClie=\DB::select('SELECT ubicacion_clientes.*,clientes.nombre nombrecliente FROM ubicacion_clientes, clientes WHERE ubicacion_clientes.id_cliente=clientes.id');

        $ubicacionCLie=["current_page"=>1, 'data'=>$ubiClie, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ubicacionCLie);
        return($jsondata);
    }

     public function myUbicacionClientes() {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();

        return view('ubicacionCliente.my-ubicacionesClientes', compact('clientes'));
    }
 
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $ubicacionCliente=UbicacionCliente::create($request->all());
       return response()->json($ubicacionCliente);
    }


    public function show(UbicacionCliente $ubicacionCliente)
    {
        //
    }


    public function edit(UbicacionCliente $ubicacionCliente)
    {
        //
    }

    public function update(Request $request, $id)
    {
       $ubicacionCliente=UbicacionCliente::find($id)->update($request->all());
       return response()->json($ubicacionCliente);
    }


    public function destroy($id)
    {
          $ubicacionCliente=UbicacionCliente::find($id);
       $ubicacionCliente->delete();
       return response()->json($ubicacionCliente);
    }
}
