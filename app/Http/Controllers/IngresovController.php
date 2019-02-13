<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Ingresov;

use DB;

class IngresovController extends Controller
{
     public function myIngresov(Request $request) {
       $ingresosv = Ingresov::paginate(20);
        if($request->ajax()){
            return response()->json(view('ingresov.ingresosv',compact('ingresosv')->render()));
        }else{
          
        return view('ingresov.my-ingresosv',compact('ingresosv'));
        }
    }

   	public function index() {
        $ingresov=\DB::select('SELECT ingresov.*,ventas.fecha fechaventa,ventas.id id_ven FROM ingresov, ventas WHERE ingresov.id_ventas=ventas.id');

        $ingresoV=["current_page"=>1, 'data'=>$ingresov, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ingresoV);
        return($jsondata);
   	}

   	public function myIngresosv() {
        $vent=\DB::table('ventas')
        ->select('*')
        ->get();

        return view('ingresov.my-ingresosv', compact('vent'));
    }

    public function store(Request $request) {
       $ingresov=Ingresov::create($request->all());
       return response()->json($ingresov);
   	}

    /*public function show(Ingresov $ingresov)
    {
        //
    }*/

   	public function update(Request $request, $id) {
       $ingresov=Ingresov::find($id)->update($request->all());
       return response()->json($ingresov);
   	}

   	 public function destroy($id)
    {
        $ingresov=Ingresov::find($id);
        $ingresov->delete();
        return response()->json($ingresov);
    }


}
