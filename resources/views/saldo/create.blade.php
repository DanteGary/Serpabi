<div class="modal fade" id="create-saldo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Saldo</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('saldos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="monto">Monto:</label>
                                 <input type="number" name="monto" class="form-control" data-error="monto." required />
                              <div class="help-block with-errors"></div>
                          </div>

                           <div class="form-group">
                           <label class="control-label" for="id_cuenta">Cuenta:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cuenta" data-error="selccione Cuenta" required>
                             
                                 @foreach($cuentas as $cuenta)
                              <option value={{$cuenta->id}}>{{$cuenta->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                         
                     <div class="form-group">
                           <label class="control-label" for="id_divisa">Divisa:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_divisa" data-error="selccione Divisa" required>
                             
                                 @foreach($divisas as $divisa)
                              <option value={{$divisa->id}}>{{$divisa->nombre_bolivianos}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn saldo-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>