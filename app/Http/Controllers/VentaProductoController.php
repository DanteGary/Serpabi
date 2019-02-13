<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\VentaProducto;
use Illuminate\Http\Request;

use DB;

class VentaProductoController extends Controller
{

    public function myVentaProducto(Request $request) {
       $ventasProductos = VentaProducto::paginate(20);
        if($request->ajax()){
            return response()->json(view('ventaProducto.ventasProductos',compact('ventasProductos')->render()));
        }else{
          
        return view('ventaProducto.my-ventasProductos',compact('ventasProductos'));
        }
    }

    public function index()
    {
        $ventaPro=\DB::select('SELECT ventas_productos.*,clientes.id id_cliente,clientes.nombre nombrecli, productos.nombre nombreProducto, productos.id id_producto FROM ventas_productos, clientes, productos WHERE ventas_productos.id_cliente=clientes.id AND ventas_productos.id_producto=productos.id');

        $ventasProductos=["current_page"=>1, 'data'=>$ventaPro, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ventasProductos);
        return($jsondata);
    }

    public function myVentasProductos(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();
        $productos=\DB::table('productos')
        ->select('*')
        ->get();

        return view('ventaProducto.my-ventasProductos', compact('clientes'))
        ->with('productos',$productos);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $ventaProducto=VentaProducto::create($request->all());
        return response()->json($ventaProducto);
    }

    public function show(VentaProducto $ventaProducto)
    {
        //
    }

    public function edit(VentaProducto $ventaProducto)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $ventaProducto=VentaProducto::find($id)->update($request->all());
       return response()->json($ventaProducto);
    }

    public function destroy($id)
    {
        $ventaProducto=VentaProducto::find($id);
        $ventaProducto->delete();
        return response()->json($ventaProducto);
    }
}
