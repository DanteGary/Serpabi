<div class="modal fade" id="create-movimiento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Movimiento</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('movimientos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="monto">Monto:</label>
                                 <input type="number" name="monto" class="form-control" data-error="monto." required />
                              <div class="help-block with-errors"></div>
                          </div>

                      <div class="form-group">

                        <label class="control-label" for="fecha">Fecha:</label>
                           <input type="date" name="fecha" class="form-control" data-error="fecha." required />
                        <div class="help-block with-errors"></div>
                      </div>
                         
                     <div class="form-group">
                        <label class="control-label" for="motivo">Motivo:</label>
                           <input type="text" name="motivo" class="form-control" data-error="motivo." required />
                        <div class="help-block with-errors"></div>
                      </div>

                        <div class="form-group">
                           <label class="control-label" for="id_tipo">Tipo:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_tipo" data-error="selccione Cargo" required>
                             
                                 @foreach($tipos as $tipo)
                              <option value={{$tipo->id}}>{{$tipo->entrada}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                      
                          <div class="form-group">
                           <label class="control-label" for="id_cuenta">Cuenta:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cuenta" data-error="selccione Cargo" required>
                             
                                 @foreach($cuentas as $cuenta)
                              <option value={{$cuenta->id}}>{{$cuenta->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn movimiento-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>