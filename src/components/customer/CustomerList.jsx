import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from "../services/CustomerService";

const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const handleGetAll = async () => {
        const customers = await CustomerService.getAlls();

        setCustomers(customers.data);
    };

    useEffect(() => {
        handleGetAll();
    }, []);
    return (
        <div className="container">
            <h1>Student List</h1>
            <Link className="btn btn-outline-primary" to={'/customer/create'}>
                <i className="fa fa-plus me-2" />
                Add Student
            </Link>
            <div>
                <table className="table table-bordered mt-3 table-danger table-hover ">
                    <thead className="table-success">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Hobby</th>
                            <th>Province</th>
                            <th>District</th>
                            <th>Ward</th>
                            <th>Address</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length && customers.map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.hobby}</td>
                                <td>{item.locationRegion.provinceName}</td>
                                <td>{item.locationRegion.districtName}</td>
                                <td>{item.locationRegion.wardName}</td>
                                <td>{item.locationRegion.address}</td>

                                <td className="text-center">
                                    <Link className="btn btn-warning me-3">
                                        <i className="fa-solid fa-eye"></i>
                                    </Link>
                                    <Link className="btn btn-success me-3" >
                                        <i className="fa-solid fa-user-pen"></i>
                                    </Link>
                                    <button className="btn btn-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
        </div>

    )
}
export default CustomerList;