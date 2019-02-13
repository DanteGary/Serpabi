<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Producto;

use DB;

class ProductosController extends Controller {
  
   	public function myProducto(Request $request) {
      $productos = Producto::paginate(2);
        if($request->ajax()){
            return response()->json(view('producto.productos',compact('productos')->render()));
        }else{
          return view('producto.my-productos',compact('productos'));
        }
   	}

   	public function index() {
       $producto=DB::table('productos')
        ->select('*')
        ->paginate(1000);
        return response()->json($producto);
   	}

      public function myProductos() {
        $producto=\DB::table('productos')
        ->select('*')
        ->get();

        return view('producto.my-productos', compact('producto'));
    }

   	public function store(Request $request) {
       $producto=Producto::create($request->all());
       return response()->json($producto);
   	}

   	public function update(Request $request, $id) {
       $producto=Producto::find($id)->update($request->all());
       return response()->json($producto);
   	}

   	public function destroy($id) {
       $producto=Producto::find($id);
       $producto->delete();
       return response()->json($producto);
   }

}
