import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LocationRegionService from '../services/LocationRegionService';
import CustomerService from '../services/CustomerService';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const studentSchema = yup.object({
    name: yup.string()
        .required("Name là bắt buộc")
        .min(5, "Tên phải từ 5 ký tự!"),
    address: yup.string().required("City là bắt buộc"),
    gender: yup.string().required()
})
const CreateCustomer = () => {
    //const [customerCreate, setCustomerCreate] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([])
    //const [checked, setChecked] = useState()

    const [locationRegion, setLocationRegion] = useState({
        provinceId: 0,
        provinceName: ''
        // districtId: 0,
        // districtName: '',
        // wardId: 0,
        // wardName: ''
    });
    const [customerCreate, setCustomerCreate] = useState({
        name: '',
        gender: 0,
        hobby: '',
        locationRegion: {},
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(studentSchema)
    })
    const handleGetAllProvinces = async () => {
        const dataProvinces = await LocationRegionService.getAllProvinces();
        setProvinces(dataProvinces.data.results);
    };
    const handleGetAllDistricts = async () => {
        const dataDistricts = await LocationRegionService.getAllDistricts();
        setDistricts(dataDistricts.data.results);
    };

    const handleOnChangeLocation = async (e) => {
        const provinceId = e.target.value;
        const index = e.nativeEvent.target.selectedIndex;
        const provinceName = e.nativeEvent.target[index].text;
        // const districtId = e.target.value;
        // const districtName = e.nativeEvent.target[index].text;

        setLocationRegion({
            ...locationRegion,
            provinceId,
            provinceName,
            // districtId,
            // districtName
        });
        const dataDistrict = await LocationRegionService.getAllDistricts(
            provinceId);
        setDistricts(dataDistrict.data.results);
        setCustomerCreate({
            ...customerCreate,
            locationRegion: {
                provinceId,
                provinceName,
            },
        });
        setWards();

    };
    const handleOnChangeDistrict = async (e) => {
        const districtId = e.target.value;

        const dataWard = await LocationRegionService.getAllDistricts(
            districtId
        );
        setWards(dataWard.data.results);


        setCustomerCreate({
            ...customerCreate,
            locationRegion: {
                ...customerCreate.locationRegion,
                districtId,
            },
        });
    };


    const handleCustomer = async (data) => {
        setLoading(true)
        try {
            await CustomerService.create(data)
            setCustomerCreate(data);
            setDistricts([]);
            setWards();

            navigate("/")
            setLoading(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        handleGetAllProvinces();
        // handleGetAllDistricts();
    }, [locationRegion]);
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-6 md-6">
                <h1>Form create</h1>
                <form onSubmit={handleCustomer} className="mx-3">
                    <div className="form-group mb-3">
                        <label className="lable-form">Name</label>
                        <input type="text" className="form-control"{...register('name')} />
                        <span className="text-danger">{errors?.name?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Gender</label>
                        <div className='col-sm-9 d-flex align-items-center'>
                            <div className="form-check form-check-inline me-3">
                                <input className="form-check-input" type="radio" value={"male"} defaultChecked={true} {...register('gender')} />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value={"female"} {...register('gender')} />
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Hobby</label>
                        <div className='col-sm-9 d-flex align-items-center'>
                            <div className="form-check form-check-inline me-3">
                                <input className="form-check-input" type="checkbox" defaultChecked={true} />
                                <label className="form-check-label">Đọc sách</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">Nghe nhạc</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Province</label>
                        <select
                            className="form-select"
                            name="province"
                            id="province"
                            onChange={(e) => handleOnChangeLocation(e)}
                        >
                            {provinces.length &&
                                provinces.map((item) => {
                                    return (
                                        <option value={item.province_id}>
                                            {item.province_name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="district">District</label>
                        <select
                            className="form-control"
                            name="district"
                            id="district"
                            value={customerCreate.locationRegion.districtId || ''}
                            onChange={(e) => handleOnChangeDistrict(e)}
                        >

                            {districts.map((item) => (
                                <option
                                    value={item.district_id}
                                    key={item.district_id}
                                >
                                    {item.district_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label className="lable-form">Ward</label>
                        <select
                            className="form-control"
                            name="ward"
                            id="ward"
                            value={customerCreate.locationRegion.wardId || ''}
                            onChange={(e) =>
                                setCustomerCreate({
                                    ...customerCreate,
                                    locationRegion: {
                                        ...customerCreate.locationRegion,
                                        wardId: e.target.value,
                                    },
                                })
                            }
                        >
                            {/* <option value="">Select ward</option> */}
                            {wards.map((item) => (
                                <option value={item.ward_id} key={item.ward_id}>
                                    {item.ward_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Address</label>
                        <input type="number" className="form-control" />
                        <span className="text-danger">{errors?.address?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary me-3">Save</button>
                        <button type="button" className="btn btn-danger">Cancel</button>
                    </div>

                    <div>
                        <Link className="btn btn-outline-primary mt-5" to={'/'}>
                            <i className="fa fa-arrow-left me-2" />
                            Back to customer list
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateCustomer;