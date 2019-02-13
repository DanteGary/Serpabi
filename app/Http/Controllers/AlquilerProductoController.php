<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\AlquilerProducto;
use Illuminate\Http\Request;

use DB;

class AlquilerProductoController extends Controller
{

    public function myAlquilerProducto(Request $request) {
       $alquileresProductos = AlquilerProducto::paginate(20);
        if($request->ajax()){
            return response()->json(view('alquilerProducto.alquileresProductos',compact('alquileresProductos')->render()));
        }else{
          
        return view('alquilerProducto.my-alquileresProductos',compact('alquileresProductos'));
        }
    }

    public function index()
    {
        $alquiPro=\DB::select('SELECT alquileres_productos.*,clientes.id id_cliente,clientes.nombre nombrecli, productos.nombre nombreProducto, productos.id id_producto FROM alquileres_productos, clientes, productos WHERE alquileres_productos.id_cliente=clientes.id AND alquileres_productos.id_producto=productos.id');

        $alquiProductos=["current_page"=>1, 'data'=>$alquiPro, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($alquiProductos);
        return($jsondata);
    }

    public function myAlquileresProductos(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();
        $productos=\DB::table('productos')
        ->select('*')
        ->get();

        return view('alquilerProducto.my-alquileresProductos', compact('clientes'))
        ->with('productos',$productos);
    }
 
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $alquilerProducto=AlquilerProducto::create($request->all());
        return response()->json($alquilerProducto);
    }

    public function show(AlquilerProducto $alquilerProducto)
    {
        //
    }

    public function edit(AlquilerProducto $alquilerProducto)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $alquilerProducto=AlquilerProducto::find($id)->update($request->all());
       return response()->json($alquilerProducto);
    }


    public function destroy($id)
    {
        $alquilerProducto=AlquilerProducto::find($id);
        $alquilerProducto->delete();
        return response()->json($alquilerProducto);
    }
}
