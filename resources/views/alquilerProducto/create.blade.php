<div class="modal fade bd-example-modal-lg" id="create-alquilerProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Alquiler</h4>
            </div>
            <div class="modal-body">
                
                    <!-- <form data-toggle="validator" action="{{ route('alquileresMateriales.store') }}" method="POST"> -->
                              {{ csrf_field() }}
                    <div class="row">  
                      <div class="col-md-6 col-xs-12 col-lg-6">       
                          <div class="col-md-8 col-xs-8">
                            <div class="form-group">
                              <label class="control-label" for="id_cliente">Cliente:</label>
                              <select id="mySelectClie" class="form-controal selectpicker " data-live-search=("true") name="id_cliente" data-error="selccione Cargo" required>
                                      <option value="">Seleccione...</option>
                                       @foreach($clientes as $cliente)
                                    <option value={{$cliente->id}}>{{$cliente->nombre}}</option>
                                       @endforeach
                              </select>
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>

                          <div class="col-md-4 col-xs-4">             
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-cliente"><i class="fa fa-plus-square"></i>Crear Cliente</button></h1>
                            </div>
                          </div>
                      </div> 

                      <div class="col-md-6 col-xs-12 col-lg-6">
                          <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                              <label class="control-label" for="feha_inicio">Fecha Inicio:</label>
                                 <input type="date" name="feha_inicio" class="form-control" value="<?php echo date('Y-m-d');?>" data-error="feha_inicio." required />
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>

                          <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                              <label class="control-label" for="feha_fin">Fecha Fin:</label>
                                <input type="date" name="feha_fin" class="form-control" value="<?php echo date('Y-m-d');?>" data-error="feha_fin." required />
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                    </div>

                      <div class="row">
                            <div class="col-md-3 col-xs-3">
                              <div class="form-group">
                                <label class="control-label" for="id_producto">Producto:</label>
                                <select id="mySelectPro" onchange="changeFunc(value);" class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Cargo" required>
                                      <option value="">Seleccione...</option>
                                         @foreach($productos as $producto)
                                      <option value={{$producto->id}}>{{$producto->nombre}}</option>
                                         @endforeach
                                </select>
                                <div class="help-block with-errors"></div>
                              </div>
                            </div>
                            <div class="col-md-3 col-xs-3">
                              <div class="form-group">
                                    <label class="control-label" for="costo_alquiler" >Costo Unitario:</label> <br>
                                    <span class="label label-warning" id="costoPro" name="costo_alquiler" >0</span>
                                    <div class="help-block with-errors"></div>
                              </div>
                            </div>
                        
                            <div class="col-md-3 col-xs-3">
                              <div class="form-group">
                                <label class="control-label" for="cantidad">Cantidad:</label>
                                <input type="number" name="cantidad" class="form-control" data-error="cantidad." required />
                                <div class="help-block with-errors"></div>
                              </div>
                            </div>

                            <div class="col-md-3 col-xs-3">
                              <div class="form-group">
                                <button type="button" id="agregarProd" class="btn btn-primary" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>Agregar</button></h1>
                              </div>
                            </div>
                      </div>
                    
                    <div class="row container-fluid">
                      <form data-toggle="validator" action="{{ route('alquileresProductos.store') }}" method="POST">
                        <h3>Alquileres</h3>
                        <div class="table-responsive">
                          <table class="table table-dark">
                            <thead class="black white-text">
                              <th scope="col">Cliente</th>
                              <th scope="col">Fecha Inicio</th>
                              <th scope="col">Fecha Fin</th>
                              <th scope="col">Producto</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col">Costo Total</th>
                              <th scope="col">Opcion</th>
                            </thead>
                            <tbody id="alquileresProducto">
                              
                            </tbody>
                          </table>
                        </div>
                          <div class="form-group">
                            <button type="submit" class="btn add-producto-submit btn-warning">Aceptar</button>
                          </div>
                      </form>
                    </div>
            </div>
          </div>
        </div>
      </div>
