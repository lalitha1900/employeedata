import { useState, useEffect } from "react";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [totalEmployeesData, setTotalEmployeesData] = useState([]);
  const [counter, setCounter] = useState(0);
  async function getEmployees() {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    if (response.ok) {
      const data = await response.json();
      setTotalEmployeesData(data);
      var newArr = [];
      for (var i = 0; i < 10; i++) {
        newArr.push(data[i]);
      }
      setEmployees(newArr);
      setCounter(0);
      //setEmployees(new Array(data).splice(0, 10));
    }
  }
  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div className="App">
      <h1>Employee data</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id + employee.name + new Date().getTime()}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            if (counter > 0) {
              var temp = counter - 1;
              setCounter(counter - 1);
              console.log(temp);
              console.log(totalEmployeesData);
              var newArr = [];
              for (
                var i = temp * 10;
                i < Math.min(temp * 10 + 10, totalEmployeesData.length);
                i++
              ) {
                newArr.push(totalEmployeesData[i]);
              }
              setTimeout(() => {
                setEmployees(newArr);
              }, 1);
            }
          }}
        >
          Previous
        </button>
        <div className="pageNo" style={{ display: "inline" }}>
          {counter + 1}
        </div>
        <button
          onClick={() => {
            if (counter < parseInt(totalEmployeesData.length / 10)) {
              var temp = counter + 1;
              setCounter(counter + 1);
              console.log(temp);
              console.log(totalEmployeesData);
              var newArr = [];
              for (
                var i = temp * 10;
                i < Math.min(temp * 10 + 10, totalEmployeesData.length);
                i++
              ) {
                newArr.push(totalEmployeesData[i]);
              }
              setTimeout(() => {
                setEmployees(newArr);
              }, 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
