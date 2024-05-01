import React, { useEffect, useState, useRef } from "react";
import { EmployeeSuccesfulProvider } from "./Providers/EmployeeSuccesfulProvider";
import EmployeeSuccessful from "./Employee/EmployeeSuccessful";
import { useRecoilState } from "recoil";
import { DataGrid } from "@mui/x-data-grid";
import classes from "./ManageEmployee.module.css";
import Modal from "../../../Ui/Modal";
import { baseURL } from "../../../../api/api";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("orders");
  const nameRef = useRef(null);
  const employeeIdRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const columns = [
    { field: "id", headerName: "Emoloyee Id", width: 150 },
    { field: "name", headerName: "Emoloyee Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "View",
      headerName: "View",
      width: 200,
      renderCell: (params) => {
        const Eid = params.row.id;
        const employee = employees.find((employee) => employee.id === Eid);
        return (
          <button
            onClick={() => {
              setSelectedEmployee(employee);
              setEmployeeSuccesscont(true);
            }}
          >
            View
          </button>
        );
      },
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   type: "number",
    //   width: 100,
    //   renderCell: (params) => {
    //     const status = params.row.status;
    //     if (status === "Pending") {
    //       return (
    //         <button
    //           onClick={() => handleAcceptOrCancel("accept", params.row.id)}
    //         >
    //           Accept
    //         </button>
    //       );
    //     } else {
    //       return status;
    //     }
    //   },
    // },
  ];

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`${baseURL}employee/getEmployees`);
      const data = await response.json();
      setEmployees(data);
      console.log(data);
    };
    sendRequest();
  }, []);

  const [employeeSuccesscont, setEmployeeSuccesscont] = useRecoilState(
    EmployeeSuccesfulProvider
  );

  // Function to handle deletion of an employee
  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addEmployee = () => {
    if (!nameRef.current.value) {
      alert("Please enter name");
      return;
    }
    if (!employeeIdRef.current.value) {
      alert("Please enter employee ID");
      return;
    }
    if (!emailRef.current.value) {
      alert("Please enter email");
      return;
    }
    if (!passwordRef.current.value) {
      alert("Please enter password");
      return;
    }
    const employeeData = {
      name: nameRef.current.value,
      employeeId: employeeIdRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };
    alert("registering employee");
    const registerEmployee = async () => {
      try {
        const response = await fetch(`${baseURL}auth/register/employee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,
          },
          body: JSON.stringify(employeeData),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error registering employee:", error);
      }
    };

    registerEmployee();
  };

  return (
    <div>
      {employeeSuccesscont && (
        <EmployeeSuccessful
          employee={selectedEmployee}
          // message={`Order ID: ${selectedorder}`}
        />
      )}

      <div className={classes.addEmployee} onClick={handleOpenModal}>
        Add Employee
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className={classes.container}>
            <div className={classes.input}>
              <label htmlFor="name">Name:</label>
              <input type="text" ref={nameRef} />
            </div>
            <div className={classes.input}>
              <label htmlFor="EmployeeId">Employee Id:</label>
              <input type="text" ref={employeeIdRef} />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">email</label>
              <input type="text" ref={emailRef} />
            </div>
            <div className={classes.input}>
              <label htmlFor="password">Password:</label>
              <input type="text" ref={passwordRef} />
            </div>
            <div className={classes.input}>
              <label htmlFor="role">Role</label>
              <select ref={roleRef}>
                <option value="orders">Orders</option>
                <option value="appointments">Appointments</option>
              </select>
            </div>
            <div className={classes.applyForm}>
              <input type="submit" onClick={addEmployee} />
            </div>
          </div>
        </Modal>
      )}
      <h2>Manage Employees</h2>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setEmployeeSuccesscont(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div style={{ height: 400, width: "100%", zIndex: -100 }}>
        <DataGrid
          rows={employees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          disableColumnSelector
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageEmployee;
