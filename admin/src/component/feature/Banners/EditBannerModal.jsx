import { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateBanner } from "../../../services/BannerService";
import Spinner from "../../shared/Spinner/Spinner";

const EditBannerModal = ({ show, onHide, banner, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pageName: "",
    bannerImage: null,
    preview: "",
  });
  const bannerRef = useRef();

  useEffect(() => {
    if (banner) {
      setFormData({
        pageName: banner.pageName,
        bannerImage: null,
        preview: banner.bannerImg?.s3Url || "",
      });
    }
  }, [banner]);

  const updateBannerImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        bannerImage: file,
        preview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pageName) {
      toast.error("Page name is required");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("pageName", formData.pageName);
      if (formData.bannerImage) {
        data.append("bannerImg", formData.bannerImage);
      }

      await updateBanner(banner?.pageName, data);
      toast.success("Banner updated successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Page Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.pageName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, pageName: e.target.value }))
              }
              required
              readOnly
            />
          </div>
          <div className="mb-3">
            <input
              className="hide-me"
              type="file"
              ref={bannerRef}
              onChange={(e) => updateBannerImage(e.target.files[0])}
              style={{ visibility: "hidden" }}
            />
            <div className="projects-banners">
              <div className="mb-2 flex-cs w-100 header">
                <h5 className="m-0">Banner Image</h5>
                <button
                  type="button"
                  onClick={() => bannerRef.current?.click()}
                  className="btn bg-gradient-success m-0"
                >
                  Change
                </button>
              </div>
              <div className="layout">
                <img src={formData.preview} alt="Banner Preview" />
              </div>
            </div>
          </div>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Update Banner"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBannerModal;
