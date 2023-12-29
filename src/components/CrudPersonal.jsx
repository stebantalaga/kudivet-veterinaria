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
    { id: 1, nombre: "Daniel Morelo", cargo: "Administrador", celular: 3148875693, correo: "danimoreno@gmail.com" },
    { id: 2, nombre: "Laura Ramírez", cargo: "Veterinario", celular: 3101234567, correo: "laura.ramirez@gmail.com" },
    { id: 3, nombre: "Carlos López", cargo: "Asistente Veterinario", celular: 3112345678, correo: "carlos.lopez@gmail.com" },
    { id: 4, nombre: "Ana Gómez", cargo: "Recepcionista", celular: 3123456789, correo: "ana.gomez@gmail.com" },
    { id: 5, nombre: "Sofía Torres", cargo: "Veterinario", celular: 3134567890, correo: "sofia.torres@gmail.com" },
    { id: 6, nombre: "Javier Sánchez", cargo: "Asistente Veterinario", celular: 3145678901, correo: "javier.sanchez@gmail.com" },
    { id: 7, nombre: "Lina Vargas", cargo: "Recepcionista", celular: 3156789012, correo: "lina.vargas@gmail.com" },
    { id: 8, nombre: "Martín Jiménez", cargo: "Veterinario", celular: 3167890123, correo: "martin.jimenez@gmail.com" },
    { id: 9, nombre: "Isabel Medina", cargo: "Asistente Veterinario", celular: 3178901234, correo: "isabel.medina@gmail.com" },
    { id: 10, nombre: "Eduardo Paredes", cargo: "Recepcionista", celular: 3189012345, correo: "eduardo.paredes@gmail.com" }
  ]
  


class CrudCliente extends React.Component {
    state={
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: '',
          nombre: '',
          cargo: '',
          celular: '',
          correo: ''
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
            arreglo[contador].nombre = dato.nombre;
            arreglo[contador].cargo = dato.cargo;
            arreglo[contador].celular = dato.celular;
            arreglo[contador].correo = dato.correo;
        }
        contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    /* Función que elimina los datos de un registro */
    eliminar = (dato) => {
        var opcion = window.confirm("Estás seguro que deseas eliminar a este personal: " + dato.nombre);
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
                    <h4>Gestionar el personal de la veterinaria</h4>
                    <button className='btn btn-primary' onClick={()=>this.mostrarModalInsertar()}>Añadir personal</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-2'>Nombre</th>
                            <th className='table-item col-md-2'>Cargo</th>
                            <th className='table-item col-md-2'>N° celular</th>
                            <th className='table-item col-md-3'>Correo electrónico</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id} className='table-row'>
                                <td className='table-item col-md-1'>{dato.id}</td>
                                <td className='table-item col-md-2'>{dato.nombre}</td>
                                <td className='table-item col-md-2'>{dato.cargo}</td>
                                <td className='table-item col-md-2'>{dato.celular}</td>
                                <td className='table-item col-md-3'>{dato.correo}</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={() => this.mostrarModalActualizar(dato)}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=> this.eliminar(dato)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para editar el registro de un miembro del personal de la veterinaria */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar personal de la veterinaria</h3></div>
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
                        <label>Nombre:</label>
                        <input
                            className="form-control"
                            name="nombre"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.nombre}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Cargo:</label>
                        <input
                            className="form-control"
                            name="cargo"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.cargo}
                        />
                        </FormGroup>
                        
                        <FormGroup>
                        <label>Número de celular:</label>
                        <input
                            className="form-control"
                            name="celular"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.form.celular}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Correo electrónico:</label>
                        <input
                            className="form-control"
                            name="correo"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.correo}
                        />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="outline-secondary" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                {/* Modal para agregar personal a la veterinaria */}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Añadir personal</h3></div>
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
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Cargo:</label>
                            <input
                                className="form-control"
                                name="cargo"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    
                        <FormGroup>
                            <label>Número de celular:</label>
                            <input
                                className="form-control"
                                name="celular"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Correo electrónico:</label>
                            <input
                                className="form-control"
                                name="correo"
                                type="text"
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

export default CrudCliente;