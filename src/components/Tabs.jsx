import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import { useState } from 'react';
import CrudCliente from './CrudCliente';
import CrudPersonal from './CrudPersonal';
import CrudInventario from './CrudInventario';



function AppTap() {

  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }

  return (
    <div className="AppTap">
       <Nav tabs>
         <NavItem>
           <NavLink 
           className={(activeTab=="1" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("1")}>
             Clientes
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="2" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("2")}>
             Personal
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="3" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("3")}>
            Inventario
           </NavLink>
         </NavItem>
       </Nav>





       <TabContent activeTab={activeTab}>
         <TabPane tabId="1">
           <div className='container'>
             <br />
             <CrudCliente />
           </div>

         </TabPane>

         <TabPane tabId="2">
           <div className='container'>
             <br />
             <CrudPersonal />
           </div>

         </TabPane>


         <TabPane tabId="3">
           <div className='container'>
             <br />
             <CrudInventario />
           </div>

         </TabPane>

       </TabContent>
    </div>
  );
}

export default AppTap;