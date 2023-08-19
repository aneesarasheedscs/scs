import React from 'react';
import { Collapse,Divider } from 'antd';
// Import the default Ant Design styles
 // Import


const Tab3 = () => {
  return (
    <div style={{width:"120%",borderRadius: '6px', marginLeft:'300px', marginTop:'40px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}}>
    <h1 style={{textAlign:'center'}}>Class Syllabus</h1>
    <Divider />
    <div className="custom-collapse"  style={{ borderRadius: '10px', marginBottom:'20%'}}>
       
      <Collapse accordion>
   
        <Collapse.Panel header="GCSE" key="1" >
       In Progress
        </Collapse.Panel>
        <Collapse.Panel header="IGSE" key="2">
        In Progress
        </Collapse.Panel>
        <Collapse.Panel header="Matric" key="3">
        In Progress
        </Collapse.Panel>
        <Collapse.Panel header="Fsc. Pre-Medical" key="4">
        In Progress
        </Collapse.Panel>
       
      </Collapse>
      
      </div>
      </div>

     
  );
};
export default Tab3;












// import { Card } from "antd";
// import React from "react";



// // import Table4 from "./Table";



// import { Collapse } from 'antd';
// import './DTab2.css'


// const Tab3: React.FC = () => (
//   <div className="custom-collapse">

//     <Card   style={{ width: "100%", marginLeft:'390px', marginTop:'40px', background:'rgb(250, 250, 250)',  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}}>
//       <h1>Class Syllabus</h1>
//     <Collapse accordion
//       collapsible="header"
     
//       style={{
//         height:"100%",
//         width:"100%",
//         marginTop:"20px",
    
//        opacity: 0.4,
//        boxSizing:"border-box",
//        fontWeight:"bold",
  
//        background: "#00a148"
      
//     }}
//       items={[
//         {
//           key: '1',
//           label: 'GCSE',
//           children: <p >In Progress</p>,
//         },
//       ]}
//     />
//      <Collapse
//       collapsible="header"
//       style={{
//         height:"100%",
//         width:"100%",
//         marginTop:"20px",
//        backgroundColor: "#00a148",
//        opacity: 0.4,
//        boxSizing:"border-box",
//        fontWeight:"bold",
 
//        background: "#00a148"
//       }}
//       items={[
//         {
//           key: '1',
//           label: 'IGSE',
//           children: <p style={{textAlign:"start", color: "#00a148"}}>In Progress</p>,
        
//         },
//       ]}
//     />

// <Collapse
//       collapsible="header"
     
//       style={{
//         height:"100%",
//         width:"100%",
//         marginTop:"20px",
//        backgroundColor: "#00a148",
//        opacity: 0.4,
//        boxSizing:"border-box",
//        fontWeight:"bold",
//        background: "#00a148"
//     }}
//       items={[
//         {
//           key: '1',
//           label: 'Matriculation',
//           children: <p style={{textAlign:"start", color: "#00a148"}}>In Progress</p>,
//         },
//       ]}
//     />
    
// <Collapse
//       collapsible="header"
     
//       style={{
//         height:"100%",
//         width:"100%",
//         marginTop:"20px",
//        backgroundColor: "#00a148",
//        opacity: 0.4,
//        boxSizing:"border-box",
//        fontWeight:"bold",
      
//        background: "#00a148"
//     }}
//       items={[
//         {
//           key: '1',
//           label: 'FSc. Pre-Medical',
//           children: <p style={{textAlign:"start", color: "#00a148"}}>In Progress</p>,
//         },
//       ]}
//     />

//     </Card>
//     </div>

// );

// export default Tab3;