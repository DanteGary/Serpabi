<style type="text/css">
.style1 .btn-primary{
-webkit-box-shadow: 6px 11px 7px 0px rgba(61,58,61,0.64);
-moz-box-shadow: 6px 11px 7px 0px rgba(61,58,61,0.64); 
box-shadow: 5px 5px 7px 0px rgba(61,58,61,0.64);
}

</style>
<div class="modal fade style1" id="create-compra" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" id="style1">

        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h3 class="modal-title" id="myModalLabel">Registro Compra</h3>
              <label class="label label-default">Fecha: <?php echo date('Y-m-d');?></label>
            </div>
            <div class="modal-body">
                  <input type="hidden" value="<?php echo date('Y-m-d');?>" name="fecha_compra">
                    <!-- <form data-toggle="validator" action="{{ route('compras.store') }}" method="POST"> -->
                            {{ csrf_field() }}
                    <div class="row">
                      <div class="col-md-3 col-xs-3">
                        <div class="form-group">
                             <label class="control-label" for="id_material">Material:</label>
                             <select class="form-control selectpicker " id="mySelectM" data-live-search=("true") name="id_material" data-error="selccione Material" required>
                                  <option value="">Seleccione...</option>
                                   @foreach($materiales_insumos as $material)
                                <option value={{$material->id}}>{{$material->nombre}}</option>
                                   @endforeach
                             </select>
                             <div class="help-block with-errors"></div>
                        </div>
                      </div>

                      <div class="col-md-3 col-xs-3" id="btnHTML">
                          <div id="boton">
                          <label class="control-label" for="id_proveedor"></label>
                          <div class="form-group">
                                <button type="button" id="agregarInsumo" class="btn btn-primary" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>  Crear Material Insumo</button>
                          </div>
                          </div>
                          <div id="recuperar" style="display: none">
                          <label class="control-label" for="id_proveedor"></label>
                           <div class="form-group">
                           <button type="button" onClick="cerrar();" id="cerrar" class="btn btn-danger" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>  Cancelar</button>
                           </div>
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
                          <label class="control-label" for="costo_unitario">Costo por Unidad:</label>
                             <input type="double" name="costo_unitario" class="form-control" data-error="Costo Unitario del Producto." required />
                          <div class="help-block with-errors"></div>
                        </div>
                      </div>
                    </div>

                    <div class="row" id="insumo">
                      <form data-toggle="validator" action="{{ route('materialesInsumos.store') }}" method="POST" id="miForm">
                       {{ csrf_field() }}
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="nombre">Nombre</label>
                               <input type="text" name="nombre" class="form-control" data-error="Nombre del Material de Insumo." required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="descripcion">Descripcion</label>
                               <input type="text" name="descripcion" class="form-control" data-error="Descripcion del Material de Insumo." required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="precio_compra">Costo Unitario</label>
                               <input type="double" name="precio_compra" class="form-control" data-error="Precio del Material de Insumo." value="0" required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <label class="control-label" for="id_proveedor"></label>
                          <div class="form-group">
                                <button type="submit" id="crearInsumo" class="btn btn-primary"><i class="fa fa-plus-square"></i>  Crear</button></h1>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="row">
                      <div class="col-md-4 col-xs-4">
                         <div class="form-group">
                             <label class="control-label" for="id_proveedor">Proveedor:</label>
                             <select class="form-control selectpicker" id="mySelectP" data-live-search=("true") name="id_proveedor" data-error="selccione Proveedor" required>
                                  <option value="">Seleccione...</option>
                                   @foreach($proveedores as $proveedor)
                                <option value={{$proveedor->id}}>{{$proveedor->nombre}}</option>
                                   @endforeach
                             </select>
                             <div class="help-block with-errors"></div>
                          </div>
                      </div>
                      <div class="col-md-4 col-xs-4" id="btnHTMLProveedor">
                        <div id="botonProveedor">
                          <label class="control-label" for="id_proveedor"></label>
                          <div class="form-group">
                                <button type="button" id="addProveedores" class="btn btn-primary" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>  Crear Proveedor</button>
                          </div>
                          </div>
                          <div id="recuperarProveedor" style="display: none">
                          <label class="control-label" for="id_proveedor"></label>
                           <div class="form-group">
                           <button type="button" onClick="cerrarProveedor();" id="cerrarProveedor" class="btn btn-danger" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>  Cancelar</button>
                           </div>
                         </div>
                      </div>
                      <div class="col-md-4 col-xs-4">
                        <div>
                          <label class="control-label" for="id_proveedor"></label>
                            <div class="form-group">
                              <button type="button" id="agregarCompra" class="btn btn-primary" data-toggle="modal" data-target=""><i class="fa fa-chevron-circle-down fa-lg"></i>  Agregar</button></h1>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" id="proveedores">
                      <div>
                      <form data-toggle="validator" action="{{ route('proveedores.store') }}" method="POST" id="miFormPro">
                       
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="nombre">Nombre:</label>
                               <input type="text" name="nombreProveedor" class="form-control" data-error="Nombre del Proveedor." required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="nit">NIT:</label>
                               <input type="number" name="nit" class="form-control" data-error="Numero de NIT del Proveedor." required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <div class="form-group">
                            <label class="control-label" for="telefono">Telefono:</label>
                               <input type="number" name="telefono" class="form-control" data-error="Numero de Telefono del Proveedor." required />
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-3 col-xs-3">
                          <label class="control-label" for="id_proveedor"></label>
                          <div class="form-group">
                                <button type="submit" id="crearProveedores" class="btn btn-primary"><i class="fa fa-plus-square"></i>  Crear</button></h1>
                          </div>
                        </div>
                      </form> 
                    </div>
                    </div>
                    <div class="row container-fluid">  
                    <form data-toggle="validator" action="{{ route('compras.store') }}" method="POST">
                          <h3>Compras</h3>
                          <div class="table-responsive">
                            <table class="table table-dark">
                              <thead class="black white-text">
                                <th scope="col">Proveedor</th>
                                <th scope="col">Fecha Compra</th>
                                <th scope="col">Material de Insumo</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Costo Total</th>
                                <th scope="col">Opcion</th>
                              </thead>
                              <tbody id="comprasInsumos">
                                
                              </tbody>
                            </table>
                          </div>
                            <div class="form-group" style="float: right;">
                              <button type="submit" class="btn addVentaInsumo-submit btn-primary">Aceptar</button>
                            </div>
                      </form>
                    </div> 
                    <!-- </form> -->
            </div>
          </div>
        </div>
      </div>