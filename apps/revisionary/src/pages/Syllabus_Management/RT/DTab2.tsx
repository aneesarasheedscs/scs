import { Card, Col, Row, Divider,Form, message} from "antd";
import { AntButton } from "./Button";
import './DTab2.css'
import './MTab.css'
import React, { useState } from "react";
import { Input } from "antd";
import { AntButton2 } from "./Button2";
import { AntButton3 } from "./Button3";
// import { AntButton4 } from "./Button4";
interface CardData {
  id: number;
  class: string;
  name: string;
}
function DTab2() {
  const cards2 = [

    {
      key: "2",
      class: "GCSE",
      name: "O-Level Paper 2",
      
    },
    {
      key: "3",
      class: "IGSE",
      name: "A-Level Paper 1",
    
    },

    {
      key: "4",
      class: "IGSE		",
      name: "A-Level Paper 2",
      
    },
    {
      key: "4",
      class: " Matriculation",
     
      name: "	Arts",
     
    },
    {
      key: "5",
      class: "Matriculation		",
      name: "Metric- 9th",
     
      
    },
    {
      key: "6",
      class: "Matriculation		",
      name: "Metric- 9th",
      
    },
    {
      key: "7",
      class: "Matriculation",
      name: "Metric- 9th Arts	",
   
      
    },
    {
      key: "8",
      class: "Matriculation",
      name: "Metric- 10th Arts",
      
      
    },

  ];
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData>({
    id: 1,
    class: "",
    name: "",
  });

  const handleAddCard = () => {
    if (newCard.class.trim() === "" || newCard.name.trim() === "") {
      // Validation failed
      return message.error("enter the code")
    }
    else{
      message.success("success")
    }

    setCards((prevCards) => [...prevCards, { ...newCard, id: Date.now() }]);
    setNewCard({
      id: Date.now() + 1,
      class: "",
      name: "",
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
    class: '',
      name: '',
    });
    form.resetFields();
  };

  return (
    <div   style={{ width: "100%", }}  >
         <Card 
         className="cards1"
         style={{ width: "100%",
         left:"8%",
         marginLeft: "390px",
         marginTop: "40px",
         background: "rgb(250, 250, 250)",
         boxShadow:
           "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
}}>
      <h1 className="h1">Class Division</h1>
      <Divider />
      <Form style={{marginLeft:'15%'}}>
      <Input
        placeholder="Code"
        style={{
          width: "30.8%",
          position: "relative",
          top: "5px",
          right: "50px",

          height: "40px",
          marginBottom: "30px",
          
        }}
        value={newCard.class}
        onChange={(e) => handleChange(e, "class")}
        className="success"
      />
      <Input
        placeholder="Name"
        style={{
          width: "31%",
          position: "relative",
          top: "5px",
          right: "20px",
          height: "40px",
          marginBottom: "30px",
        }}
        value={newCard.name}
        onChange={(e) => handleChange(e, "name")}
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
        onClick={handleAddCard}  /> */}
        </Form>
      <Row gutter={[16,16]}>
        {cards2.map((card) => {
          return (
            <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
              <Card
                key={card.key}
                className="card1"
                // title="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
                bordered={false}
                style={{ lineHeight:'30px', textAlign:'center'}}
              >
                <div>
             
                  <p style={{fontWeight:'bold', fontSize:'16px'}}>{card.class}</p>
                  <p>{card.name}</p>
                  <AntButton style={{ background: "#00a148" }} />
                </div>
              </Card>
            </Col>
          );
        })}
        {cards.map((card) => {
                return (
                  <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                     {/* <Spin tip="Loading" size="large"></Spin> */}
                    <Card   
                      key={card.id}
                    
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
                          {card.class}
                        </p>
                        <p>{card.name}</p>

                        <AntButton style={{ background: "#00a148" }} />
                      </div>
                    </Card>
                  </Col>
                );
              })}
      </Row>
      </Card>
    </div>
  );
}

export default DTab2;
