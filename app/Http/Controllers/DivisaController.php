<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Divisa;
use Illuminate\Http\Request;

use DB;

class DivisaController extends Controller
{

   public function myDivisa(Request $request) {
      $divisas = Divisa::paginate(2);
        if($request->ajax()){
            return response()->json(view('divisa.divisas',compact('divisas')->render()));
        }else{
          return view('divisa.my-divisas',compact('divisas'));
        }
    }

    public function index()
    {
         $divisa=DB::table('divisas')
           ->select('*')
           ->paginate(1000);
       return response()->json($divisa);    
   }

    public function divisas(Request $request) {
        $divisas = Divisa::paginate(2);
        if($request->ajax()){
            return response()->json(view('divisa.divisas',compact('divisas')->render()));
        }
        return view('divisa.my-divisas',compact('divisas'));
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $divisa=Divisa::create($request->all());
       return response()->json($divisa);
    }

 
    public function show(Divisa $divisa)
    {
        //
    }


    public function edit(Divisa $divisa)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        $divisa=Divisa::find($id)->update($request->all());
       return response()->json($divisa);
    }


    public function destroy($id)
    {
        $divisa=Divisa::find($id);
       $divisa->delete();
       return response()->json($divisa);
    }
}
