
import React, { useState } from "react";
import {
  Card,
  Input,
  Form,
  message,
  Row,
  Col,
  Divider,
} from "antd";
import { AntButton } from "./Button";
import { AntButton2 } from "./Button2";
import { AntButton3 } from "./Button3";
// import { AntButton4 } from "./Button4";
import './DTab2.css'
interface CardData {
  id: number;
  value: string;
  label: string;
}

const DTab: React.FC = () => {
  const cards1 = [
    {
      key: 1,
      value: "GCSE",
      label: "General Certificate of Secondary Education",
    
    },
     {
       key: 2,
       value: "	IGSE",
       label: "	International General Certificate of Secondary Education",
    
     },
     {
      key: 3,
       value: "Matric",
        label: "Secondary School Certificate/Matriculation ",
     
   },
    {
      key: 4,
      value: "Fsc. Pre-Medical",
      label: " preceding and preparing for the professional study of medicine",
  
    },

    {
      key: 5,
      value: "	ICS",
      label: "	intermediate of Computer Science/ (ICS) programme",
    
    },
    {
      key: 6,
      value: "I.COM",
        label: " Intermediate of Commerce/career-oriented field.",
  
    },
   
  ];
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData>({
    id: 1,
    value: "",
    label: "",
  });

  const handleAddCard = () => {
    if (newCard.value.trim() === "" || newCard.label.trim() === "") {
      // Validation failed
      return message.error("enter the code")
    }
    else{
      message.success("success")
    }

    setCards((prevCards) => [...prevCards, { ...newCard, id: Date.now() }]);
    setNewCard({
      id: Date.now() + 1,
      value: "",
      label: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CardData
  ) => {
    const { value } = e.target;
    setNewCard((prevCard) => ({ ...prevCard, [field]: value }));
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setNewCard({
      id: Date.now() + 1,
      value: '',
      label: '',
    });
    form.resetFields();
  };
  return (
    <div style={{ width: "100%"}}>
      <Card className="cards1" 
        style={{
          width: "100%",
          left:"8%",
          marginLeft: "390px",
          marginTop: "40px",
          background: "rgb(250, 250, 250)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
      >
        <h1 className="h1">Classes</h1>
        <Divider />
        <div>
          <Form style={{marginLeft:'10rem'}}>
            <Input
              placeholder="Code"
              value={newCard.value}
              onChange={(e) => handleChange(e, "value")}
              style={{
                width: "30.8%",
                position: "relative",
                top: "5px",
                right: "50px",
                height: "40px",
                marginBottom: "30px",
              }}
              className="success"
            />
            <Input
              placeholder="Name"
              value={newCard.label}
              onChange={(e) => handleChange(e, "label")}
              style={{
                width: "31%",
                position: "relative",
                top: "5px",
                right: "20px",
                height: "40px",
                marginBottom: "30px",
              }}
              className="success"
            />

            <AntButton2
              style={{
                width: "10%",
                position: "relative",
                top: "5px",
                right: "-10px",
                background: "white",
                border: "1px solid rgb(204, 202, 202)",
                color: "#00a148",
              }}
              onClick={handleCancel}
            />
            <AntButton3
              style={{
                width: "10%",
                position: "relative",
                top: "5px",
                right: "-20px",
                background: "#00a148",
              }}
              onClick={handleAddCard}
            />
            {/* <AntButton4
              style={{
                width: "16%",
                position: "relative",
                top: "5px",
                right: "-30px",
                background: "#00a148",
              }}
            /> */}
          </Form>
          <div style={{marginLeft:'5rem'}} >
            <Row gutter={[16, 16]}>
              {cards1.map((card) => {
                return (
                  <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }} >
                    <Card
                    style={{height:"90%", width:"90%"}}
                      key={card.key}
                      className="card1"
                      // code="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
                      bordered={false}
                    >
                      <div>
                  
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            lineHeight: "15px",
                          }}
                        >
                          {card.value}
                        </p>
                        <p>{card.label}</p>

                        <AntButton style={{ background: "#00a148", marginTop:'20px' }} />
                      </div>
                    </Card>
                  </Col>
                );
              })}

              {cards.map((card) => {
                return (
                  <Col span={8}xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                    <Card
                      key={card.id}
                      className="card1"
                      // code="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
                      bordered={false}
                    >
                      <div>
                        {/* <img
                      src={card.img}
                      style={{ height: "63px", width: "80px" }}
                    /> */}
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            lineHeight: "12px",
                          }}
                        >
                          {card.value}
                        </p>
                        <p>{card.label}</p>

                        <AntButton style={{ background: "#00a148", marginTop:'20px' }} />
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DTab;
// import { Card, Col, Row, Input, Divider } from "antd";
// import { AntButton } from "./Button";
// import InputB from "./InputB";
// import React, { useState } from 'react';

// import { AntButton2 } from "./Button2";
// import { AntButton3 } from "./Button3";
// import { AntButton4 } from "./Button4";
// function DTab() {
//   const cards = [
//     {
//       key: 1,
//       code: "GCSE AQA ",
//       name: "Assessment and Qualifications Alliance",
//       img: require("../img/images.png"),
//     },
//     {
//       key: 2,
//       code: "EDEXCEL  ",
//       name: "Pearson Edexcel",
//       img: require("../img/download.png"),
//     },
//     {
//       key: 3,
//       code: "GCSE OCR",
//       name: " Oxford, Cambridge, and RSA Exams",
//       img: require("../img/images.png"),
//     },
//     {
//       key: 4,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/download.png"),
//     },

//     {
//       key: 5,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/images.png"),
//     },
//     {
//       key: 6,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/download.png"),
//     },
//     {
//       key: 7,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/download.png"),
//     },
//     {
//       key: 8,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/download.png"),
//     },
//     {
//       key: 9,
//       code: "GCSE CCEA  ",
//       name: "Council for Curriculum and Examinations Assessment",
//       img: require("../img/download.png"),
//     },
//   ];

//   return (
//     <div style={{ width: "100%" }}>
//       <Card
//         style={{
//           width: "100%",
//           marginLeft: "390px",
//           marginTop: "40px",
//           background: "rgb(250, 250, 250)",
//           boxShadow:
//             "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
//         }}
//       >
//         <h1 className="h1">Syllabus Authority / Publisher</h1>
//         <Divider />
//         <div>
//       <Input
//         placeholder="Code"
//         style={{
//           width: "30.8%",
//           position: "relative",
//           top: "5px",
//           right: "50px",
//           height: "40px",
//           marginBottom: "30px",

//         }}

//         className="success"
//       />
//       <Input
//         placeholder="Name"
//         style={{
//           width: "31%",
//           position: "relative",
//           top: "5px",
//           right: "20px",
//           height: "40px",
//           marginBottom: "30px",
//         }}
//         className="success"

//       />
//       <AntButton2
//         style={{
//           width: "7%",
//           position: "relative",
//           top: "5px",
//           right: "-10px",
//           background: "white",
//           border: "1px solid rgb(204, 202, 202)",
//           color: "#00a148",
//         }}

//       />
//       <AntButton3
//         style={{
//           width: "6%",
//           position: "relative",
//           top: "5px",
//           right: "-20px",
//           background: "#00a148",
//         }}
//       />
//       <AntButton4
//         style={{
//           width: "16%",
//           position: "relative",
//           top: "5px",
//           right: "-30px",
//           background: "#00a148",
//         }}
//       />
//     </div>
//         <Row gutter={[16, 16]}>
//           {cards.map((card) => {
//             return (
//               <Col span={8}>
//                 <Card
//                   key={card.key}
//                   className="card1"
//                   // code="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
//                   bordered={false}
//                 >
//                   <div>
//                     <img
//                       src={card.img}
//                       style={{ height: "63px", width: "80px" }}
//                     />
//                     <p
//                       style={{
//                         fontWeight: "bold",
//                         fontSize: "16px",
//                         lineHeight: "12px",
//                       }}
//                     >
//                       {card.code}
//                     </p>
//                     <p>{card.name}</p>

//                     <AntButton style={{ background: "#00a148" }} />
//                   </div>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Card>
//     </div>
//   );
// }

// export default DTab;
