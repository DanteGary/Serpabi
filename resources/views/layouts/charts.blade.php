@extends ('layouts.admin')
@section('charts')
	<div class="row">
		
	<div class="col-md-6">
                                <div class="char">% de Productos a Vencer</div>
                                <canvas id="myChart" width="400" height="400"></canvas>

                              </div>
                              <div class="col-md-6">
                              <div class="char">% de Productos en Stock</div>
                        <canvas id="myChart2" width="400" height="400"></canvas>

                   </div>
	</div>
	
@endsection