<div class="modal fade" id="create-ingresov" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Ingreso de Venta</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('ingresosv.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="motivo">Motivo:</label>
                                 <input type="text" name="motivo" class="form-control" data-error="motivo." required />
                              <div class="help-block with-errors"></div>
                        </div>

                      <div class="form-group">
                        <label class="control-label" for="fecha">Fecha:</label>
                           <input type="date" name="fecha" class="form-control" data-error="fecha." required />
                        <div class="help-block with-errors"></div>
                      </div>
                         
                     <div class="form-group">
                           <label class="control-label" for="id_ventas">Venta:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_ventas" data-error="selccione Venta" required>
                             
                                 @foreach($vent as $venta)
                              <option value={{$venta->id}}>{{$venta->fecha}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>

                      <div class="form-group">
                          <button type="submit" class="btn ingresov-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>