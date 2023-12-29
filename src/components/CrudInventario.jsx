import React from 'react'
import '../App.css'
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";


const data = [
    { id: 1, producto: "Shampoo para Perros", categoria: "Aseo", stock: 24, precio: 20000 },
    { id: 2, producto: "Collar Antipulgas", categoria: "Salud", stock: 50, precio: 15000 },
    { id: 3, producto: "Comida para Gatos", categoria: "Alimentación", stock: 40, precio: 30000 },
    { id: 4, producto: "Juguete para Conejos", categoria: "Juguetes", stock: 15, precio: 10000 },
    { id: 5, producto: "Hueso para Perros", categoria: "Snacks", stock: 35, precio: 25000 },
    { id: 6, producto: "Arena para Gatos", categoria: "Aseo", stock: 30, precio: 18000 },
    { id: 7, producto: "Cama para Mascotas", categoria: "Accesorios", stock: 20, precio: 35000 },
    { id: 8, producto: "Vacuna Canina", categoria: "Salud", stock: 10, precio: 50000 },
    { id: 9, producto: "Peine para Perros", categoria: "Aseo", stock: 28, precio: 12000 },
    { id: 10, producto: "Arnés para Gatos", categoria: "Accesorios", stock: 18, precio: 22000 },
    { id: 11, producto: "Snacks para Pájaros", categoria: "Snacks", stock: 25, precio: 18000 },
    { id: 12, producto: "Correa para Conejos", categoria: "Accesorios", stock: 12, precio: 15000 },
    { id: 13, producto: "Cepillo para Gatos", categoria: "Aseo", stock: 22, precio: 16000 },
    { id: 14, producto: "Juguete para Perros", categoria: "Juguetes", stock: 30, precio: 22000 },
    { id: 15, producto: "Comida para Peces", categoria: "Alimentación", stock: 40, precio: 25000 },
    { id: 16, producto: "Terrario para Reptiles", categoria: "Hábitats", stock: 8, precio: 45000 },
    { id: 17, producto: "Cama para Conejos", categoria: "Accesorios", stock: 15, precio: 30000 },
    { id: 18, producto: "Arena para Hámsters", categoria: "Aseo", stock: 20, precio: 12000 },
    { id: 19, producto: "Juguete para Pájaros", categoria: "Juguetes", stock: 18, precio: 10000 },
    { id: 20, producto: "Cepillo para Caballos", categoria: "Aseo", stock: 5, precio: 60000 }
  ]  


class CrudInventario extends React.Component {
    state={
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: '',
          producto: '',
          categoria: '',
          stock: '',
          precio: ''
        }
    };
    
    /* Función para cerrar el modal de actualización de datos */
    mostrarModalActualizar = (dato) => {
        this.setState({
        form: dato,
        modalActualizar: true,
        });
    };

    /* Función para cerrar el modal de actualización de datos */
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    /* Función para abrir el modal de añadir datos */
    mostrarModalInsertar = () => {
        this.setState({
        modalInsertar: true,
        });
    };

    /* Función para cerrar el modal de añadir mascota */
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    /* Función que guarda la edición de datos */
    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
        if (dato.id == registro.id) {
            arreglo[contador].producto = dato.producto;
            arreglo[contador].categoria = dato.categoria;
            arreglo[contador].stock = dato.stock;
            arreglo[contador].precio = dato.precio;
        }
        contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    /* Función que elimina los datos de un registro */
    eliminar = (dato) => {
        var opcion = window.confirm("Estás seguro que deseas eliminar este producto: "+dato.producto);
        if (opcion == true) {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
            arreglo.splice(contador, 1);
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    /* Función que añade un registro a los datos */
    insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
        },
        });
    };

    /* UI que se renderiza al usuario */
    render() {
        return(
            <div>
                <div className='wrap-space-between'>
                    <h4>Gestionar inventario</h4>
                    <button className='btn btn-primary' onClick={()=>this.mostrarModalInsertar()}>Añadir producto</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-3'>Producto</th>
                            <th className='table-item col-md-2'>Categoría</th>
                            <th className='table-item col-md-2'>Stock</th>
                            <th className='table-item col-md-2'>Precio</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id} className='table-row'>
                                <td className='table-item col-md-1'>{dato.id}</td>
                                <td className='table-item col-md-3'>{dato.producto}</td>
                                <td className='table-item col-md-2'>{dato.categoria}</td>
                                <td className='table-item col-md-2'>{dato.stock} unidades</td>
                                <td className='table-item col-md-2'>${dato.precio} COP</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={() => this.mostrarModalActualizar(dato)}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=> this.eliminar(dato)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para editar el registro de una mascota en la base de datos */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar producto</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                        <label>Id:</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={this.state.form.id}
                        />
                        </FormGroup>
                        
                        <FormGroup>
                        <label>Nombre del producto:</label>
                        <input
                            className="form-control"
                            name="producto"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.producto}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Categoría:</label>
                        <input
                            className="form-control"
                            name="categoria"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.categoria}
                        />
                        </FormGroup>
                        
                        <FormGroup>
                        <label>Cantidad en Stock:</label>
                        <input
                            className="form-control"
                            name="stock"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.form.stock}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Precio:</label>
                        <input
                            className="form-control"
                            name="precio"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.form.precio}
                        />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="outline-secondary" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                {/* Modal para agregar una nueva mascota a la base de datos */}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Añadir producto</h3></div>
                    </ModalHeader>
                    
                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.data.length+1}
                            />
                        </FormGroup>
                    
                        <FormGroup>
                            <label>Nombre del producto:</label>
                            <input
                                className="form-control"
                                name="producto"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Categoría:</label>
                            <input
                                className="form-control"
                                name="categoria"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    
                        <FormGroup>
                            <label>Cantidad en Stock:</label>
                            <input
                                className="form-control"
                                name="stock"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Precio:</label>
                            <input
                                className="form-control"
                                name="precio"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
                        <Button color="outline-secondary" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                </div>
        )
    }
}

export default CrudInventario;