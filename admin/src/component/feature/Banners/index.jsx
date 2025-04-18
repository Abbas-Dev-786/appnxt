import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBanners } from "../../../services/BannerService";
import CreateBannerModal from "./CreateBannerModal";
import EditBannerModal from "./EditBannerModal";
import Spinner from "../../shared/Spinner/Spinner";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await getBanners();
      setBanners(response.data);
    } catch (error) {
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowEditModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header flex-cs header pt-4 pb-2">
          <h5>Banners</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Page Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner._id}>
                      <td>
                        <img
                          src={banner?.bannerImg?.s3Url}
                          alt={banner.pageName}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{banner.pageName}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(banner)}
                        >
                          <i className="fa-solid fa-pen-to-square" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateBannerModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchBanners();
          }}
        />
      )}

      {showEditModal && (
        <EditBannerModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          banner={selectedBanner}
          onSuccess={() => {
            setShowEditModal(false);
            fetchBanners();
          }}
        />
      )}
    </div>
  );
};

export default Banners;
