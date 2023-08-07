import { Card } from 'antd';
import React, { useEffect, useState } from 'react';

interface Users {
  name: string;
  street: string;
}
const Cardsfile: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  const getUSers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    setUsers(await response.json());
    console.log(users);
  };
  useEffect(() => {
    getUSers();
  }, [users]);

  return (
    <>
      <div className="container">
        <Card
          className="cards"
          cover={
            <>
              <div className="cardList">
                <h3>Qurban Lahore</h3>
                <span className="orders">Order# 1432</span>
                <div className="card-items">
                  <span className="list-items">Open</span>
                  <span className="list-items2">Approved</span>
                </div>
                <div className="card-items">
                  <span className="date"> Oct 27, 2022</span>
                  <span className="amount">48000</span>
                </div>
              </div>
            </>
          }
        />
        {users &&
          users.map((result, index) => {
            return (
              <>
                <Card
                  key={index}
                  className="cards"
                  cover={
                    <>
                      <div className="cardList">
                        <h3>{result.name}</h3>
                        <p>{result.street}</p>
                        <span className="orders">Order# 1432</span>
                        <div className="card-items">
                          <span className="list-items">Open</span>
                          <span className="list-items2">Approved</span>
                        </div>
                        <div className="card-items">
                          <span className="date"> Oct 27, 2022</span>
                          <span className="amount">48000</span>
                        </div>
                      </div>
                    </>
                  }
                />
              </>
            );
          })}
      </div>
    </>
  );
};
export default Cardsfile;
