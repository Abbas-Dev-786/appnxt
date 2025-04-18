import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../../../util/formateDate";
import { useState } from "react";
import { toast } from "react-toastify";
import { remove } from "../../../../services/ProjectService";
import { handleRemoveData } from "../../../../redux/ProjectDataSlice";
import Spinner from "../../../shared/Spinner/Spinner";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.ProjectDataSlice.data);

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await remove(selectedProject?._id);
      if (response.success) {
        dispatch(handleRemoveData(selectedProject?._id));
        toast.success("Project deleted successfully!");
        setIsLoading(false);
        setShowModal(false);
      } else setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Projects table</h5>
                  <NavLink
                    to="/create-project"
                    className="btn bg-gradient-info"
                  >
                    <i class="fa-solid fa-plus" /> &nbsp; Add Projects
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Image
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Project Name
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Creat Date
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Last Update Date
                        </th>
                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {projectData?.map((project, index) => (
                        <tr key={project._id}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <img
                                  src={project?.mainBanner?.s3Url}
                                  className="avatar avatar-lg"
                                  alt="user1"
                                />
                              </div>
                              {/* <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">John Michael</h6>
                                                                <p className="text-xs text-secondary mb-0">
                                                                john@creative-tim.com
                                                                </p>
                                                            </div> */}
                            </div>
                          </td>
                          <td>
                            <p className="text-xl font-weight-bold mb-0">
                              {project.name}
                            </p>
                            <p className="text-xs text-secondary mb-0">
                              {project.type}
                            </p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="badge badge-sm bg-gradient-success">
                              {project.status}
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {formatDate(project?.createdDate)}
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {formatDate(project?.updatedDate)}
                            </span>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex">
                              <NavLink
                                to={`/update-project/${project?._id}`}
                                className=" btn btn-link m-0 text-secondary font-weight-bold text-xs"
                                data-original-title="Edit user"
                              >
                                Edit
                              </NavLink>
                              <button
                                className="btn btn-link text-danger text-gradient px-3 mb-0"
                                onClick={() => handleDeleteClick(project)}
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
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
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
                Are you sure you want to delete project "{selectedProject?.name}
                "?
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
  );
};

export default Projects;
