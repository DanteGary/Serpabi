<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Proveedor;

use DB;

class ProveedorController extends Controller {
  
   	public function myProveedor(Request $request) {
       $proveedores = Proveedor::paginate(20);
        if($request->ajax()){
            return response()->json(view('proveedor.proveedores',compact('proveedores')->render()));
        }else{
          
        return view('proveedor.my-proveedores',compact('proveedores'));
        }
   	}

   	public function index() {
       $proveedor=DB::table('proveedores')
           ->select('*')
           ->paginate(1000);
       return response()->json($proveedor);
   	}

    public function proveedores(Request $request) {
        $proveedores = Proveedor::paginate(20);
        if($request->ajax()){
            return response()->json(view('proveedor.proveedores',compact('proveedores')->render()));
        }else{

        return view('proveedor.my-proveedores',compact('proveedores'));
        }
    }



   	public function create() {
       //
   	}    

   	public function store(Request $request) {
       $proveedor=Proveedor::create($request->all());
       return response()->json($proveedor);
   	}

   	public function show($id) {
       //
   	}

   	public function edit($id) {
       //
   	}   

   	public function update(Request $request, $id) {
       $proveedor=Proveedor::find($id)->update($request->all());
       return response()->json($proveedor);
   	}
   
   public function destroy($id) {
       $proveedor=Proveedor::find($id);
       $proveedor->delete();
       return response()->json($proveedor);
   }
}
