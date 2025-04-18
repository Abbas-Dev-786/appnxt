import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { createBanner } from "../../../services/BannerService";
import Spinner from "../../shared/Spinner/Spinner";

const CreateBannerModal = ({ show, onHide, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pageName: "",
    bannerImage: null,
    preview: "",
  });
  const bannerRef = useRef();

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
    if (!formData.pageName || !formData.bannerImage) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("pageName", formData.pageName);
      data.append("bannerImg", formData.bannerImage);

      await createBanner(data);
      toast.success("Banner created successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Banner</Modal.Title>
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
                <h5 className="m-0">Add Banner Image</h5>
                <button
                  type="button"
                  onClick={() => bannerRef.current?.click()}
                  className="btn bg-gradient-success m-0"
                >
                  {formData.preview ? "Change" : "Upload"}
                </button>
              </div>
              <div className="layout">
                {formData.preview ? (
                  <img src={formData.preview} alt="Banner Preview" />
                ) : (
                  <button
                    type="button"
                    onClick={() => bannerRef.current?.click()}
                    className="btn btn-default"
                  >
                    <i className="fa-solid fa-plus" /> &nbsp; Upload Banner
                    Image
                  </button>
                )}
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
              {loading ? <Spinner /> : "Create Banner"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBannerModal;
