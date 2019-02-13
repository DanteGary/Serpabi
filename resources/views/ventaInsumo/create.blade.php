<div class="modal fade" id="create-ventaInsumo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Venta de Material de Insumo</h4>
            </div>
            <div class="modal-body">
                
                    <!-- <form data-toggle="validator" action="{{ route('ventasProductos.store') }}" method="POST"> -->
            {{ csrf_field() }}  
                      <div class="row"> 
                        <div class="col-md-6 col-xs-12 col-lg-6"> 
                          <div class="col-md-8 col-xs-8">
                  <div class="form-group">
                                  <label class="control-label" for="id_cliente">Cliente:</label>
                                  <select id="mySelectCl" class="form-controal selectpicker " data-live-search=("true") name="id_cliente" data-error="selccione Cliente" required>
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
                <div class="col-md-4 col-xs-4">
                              <div class="form-group">
                                  <label class="control-label" for="fecha_venta">Fecha:</label>
                                     <input type="date" name="fecha_venta" class="form-control" data-error="fecha_venta." value="<?php echo date('Y-m-d');?>" required />
                                  <div class="help-block with-errors"></div>
                              </div>
                            </div>
                          </div>
                      </div>
                    
                    <div class="row"> 
                      <div class="col-md-6 col-xs-12 col-lg-6">
                        <div class="col-md-6 col-xs-6">
                   <div class="form-group">
                                    <label class="control-label" for="id_material">Material de Insumo:</label>
                                    <select id="mySelectI" onchange="changeFuncIns(value);" class="form-control selectpicker " data-live-search=("true") name="id_material" data-error="selccione Cargo" required>
                                          <option value="">Seleccione...</option>
                                             @foreach($materiales_insumos as $material_insumo)
                                          <option value={{$material_insumo->id}}>{{$material_insumo->nombre}}</option>
                                             @endforeach
                                    </select>
                                    <div class="help-block with-errors"></div>
                                  </div>
                </div>

                <div class="col-md-6 col-xs-6">
                              <div class="form-group">
                                      <label class="control-label" for="costo_venta" >Costo Unitario:</label> <br>
                                      <span class="label label-warning" id="costoInsumo" name="costo_venta" >0</span>
                                      <div class="help-block with-errors"></div>
                                  </div>
                            </div>
              </div>
              <div class="col-md-6 col-xs-12 col-lg-6">
                <div class="col-md-6 col-xs-6">
                              <div class="form-group">
                                <label class="control-label" for="cantidad">Cantidad:</label>
                                   <input type="number" name="cantidad" class="form-control" data-error="cantidad." required />
                                <div class="help-block with-errors"></div>
                            </div>
                </div>
                          <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                  <button type="button" id="agregarInsu" class="btn btn-primary" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>Agregar</button></h1>
                                </div>
                              </div>
                        </div>
                    </div>
                      

            <div class="row container-fluid">
                        <form data-toggle="validator" action="{{ route('ventasInsumos.store') }}" method="POST">
                          <h3>Ventas</h3>
                          <div class="table-responsive">
                            <table class="table table-dark">
                              <thead class="black white-text">
                                <th scope="col">Cliente</th>
                                <th scope="col">Fecha Venta</th>
                                <th scope="col">Material de Insumo</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Costo Total</th>
                                <th scope="col">Opcion</th>
                              </thead>
                              <tbody id="ventasInsumos">
                                
                              </tbody>
                            </table>
                          </div>
                            <div class="form-group">
                              <button type="submit" class="btn addVentaInsumo-submit btn-warning">Aceptar</button>
                            </div>
                      </form>
                      </div>
                    <!-- </form> -->
            </div>
          </div>
        </div>
      </div>