<div class="modal fade" id="create-ubicacion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Ubicacion</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('ubicaciones.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="latitud">Latitud:</label>
                                 <input type="double" name="latitud" class="form-control" data-error="latitud." required />
                              <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">
                              <label class="control-label" for="longitud">Longitud:</label>
                                 <input type="double" name="longitud" class="form-control" data-error="longitud." required />
                              <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">
                           <label class="control-label" for="id_movilidad">Movilidad:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_movilidad" data-error="selccione Movilidad" required>
                             
                                 @foreach($movili as $movilidad)
                              <option value={{$movilidad->id}}>{{$movilidad->placa}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">
                           <label class="control-label" for="id_cliente">Cliente:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cliente" data-error="selccione Movilidad" required>
                             
                                 @foreach($clientes as $cliente)
                              <option value={{$cliente->id}}>{{$cliente->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                     
                      <div class="form-group">
                          <button type="submit" class="btn ubicacion-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>