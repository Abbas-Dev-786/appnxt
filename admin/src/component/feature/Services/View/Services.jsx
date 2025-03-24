import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate } from '../../../../util/formateDate'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { remove } from '../../../../services/ServiceService'
import { handleRemoveData } from '../../../../redux/ServiceDataSlice'
import Spinner from '../../../shared/Spinner/Spinner'

const Services = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const serviceData = useSelector(state => state.ServiceDataSlice.data)

    const handleDeleteClick = (service) => {
        setSelectedService(service)
        setShowModal(true)
    }

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const response = await remove(selectedService?._id)
            if (response.success) {
                dispatch(handleRemoveData(selectedService?._id))
                toast.success('Service deleted successfully!')
                setIsLoading(false)
                setShowModal(false)
            } else setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error deleting service:', error)
            toast.error('Failed to delete service')
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="com-md-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <div className="flex-cs header">
                                    <h5>Services table</h5>
                                    <NavLink to='/create-service' className="btn bg-gradient-info">
                                        <i className="fa-solid fa-plus" /> &nbsp; Add Service
                                    </NavLink>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Banner
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                    Service Details
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Status
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Category
                                                </th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    Created Date
                                                </th>
                                                <th className="text-secondary opacity-7">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceData?.map((service) => (
                                                <tr key={service._id}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img
                                                                    src={service.banner?.s3Url}
                                                                    className="avatar avatar-lg"
                                                                    alt="banner"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xl font-weight-bold mb-0">{service.heading}</p>
                                                        <p className="text-xs text-secondary mb-0">{service.description}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className={`badge badge-sm bg-gradient-${service.status === 'active' ? 'success' : 'warning'}`}>
                                                            {service.status}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span className="text-secondary text-xs font-weight-bold">
                                                            {service.link?.category}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span className="text-secondary text-xs font-weight-bold">
                                                            {formatDate(service?.createdDate)}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="d-flex">
                                                            <NavLink
                                                                to={`/update-service/${service?._id}`}
                                                                className="btn btn-link m-0 text-secondary font-weight-bold text-xs"
                                                            >
                                                                Edit
                                                            </NavLink>
                                                            <button
                                                                className="btn btn-link text-danger text-gradient px-3 mb-0"
                                                                onClick={() => handleDeleteClick(service)}
                                                            >
                                                                <i className="far fa-trash-alt me-2"></i>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button 
                                    type="button" 
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete service "{selectedService?.heading}"?
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete {isLoading && <Spinner />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Services