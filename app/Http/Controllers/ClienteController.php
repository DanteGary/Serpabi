<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Cliente;
use Illuminate\Http\Request;

use DB;

class ClienteController extends Controller
{
    public function myCliente(Request $request) {
      $clientes = Cliente::paginate(2);
        if($request->ajax()){
            return response()->json(view('cliente.clientes',compact('clientes')->render()));
        }else{
          return view('cliente.my-clientes',compact('clientes'));
        }
    }

    public function myMap(Request $request){
        // if ($request->isMethod('POST')) {
        //     $latitud = $request->input("latitud");
        //     $longitud = $request->input("longitud");
        // }

        return view('cliente.map');

    }
 
    public function index()
    {
        $cliente1=\DB::select('SELECT * FROM clientes WHERE clientes.id NOT IN (SELECT ubicacion_clientes.id_cliente FROM clientes, ubicacion_clientes WHERE ubicacion_clientes.id_cliente=clientes.id)');

        $clieentes2=["current_page"=>1, 'data'=>$cliente1, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($clieentes2);
        return($jsondata);
   }

   public function mostrar(){
        $cliente2=\DB::select('SELECT DISTINCT ubicacion_clientes.id_cliente , clientes.* FROM  clientes, ubicacion_clientes WHERE ubicacion_clientes.id_cliente = clientes.id ');

        $clieentes=["current_page"=>1, 'data'=>$cliente2, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($clieentes);
        return($jsondata);
   }

   public function ultimo(){
    // $mostrar=\DB::select('SELECT clientes.id idMostrar FROM clientes ORDER BY clientes.id DESC LIMIT 1')->get();
    
    $mostrar=Cliente::latest()->orderBy('id','DESC')->first(); 
    return view('cliente.my-clientes',compact('mostrar'));
   }

    public function clientes(Request $request) {
        $clientes = Cliente::paginate(2);
        if($request->ajax()){
            return response()->json(view('cliente.clientes',compact('clientes')->render()));
        }
        return view('cliente.my-clientes',compact('clientes'));
    }
       
    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        $cliente=Cliente::create($request->all());
        $mostrar=Cliente::latest()->orderBy('id','DESC')->first();
        $id = $mostrar->id; 
       return response()->json($id);
    }

 
    public function show(Cliente $cliente)
    {
        //
    }


    public function edit(Cliente $cliente)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $cliente=Cliente::find($id)->update($request->all());
       return response()->json($cliente);
    }

  
    public function destroy($id)
    {
        $cliente=Cliente::find($id);
       $cliente->delete();
       return response()->json($cliente);
    }
}
