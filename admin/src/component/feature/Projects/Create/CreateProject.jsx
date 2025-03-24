import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { create, modify } from '../../../../services/ProjectService'
import Spinner from '../../../shared/Spinner/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Banners from './Banners'
import Content from './Content'
import Thumbnail from './Thumbnail'
import Preview from './Preview'
import { useDispatch, useSelector } from 'react-redux'
import { handleModifyData, handlePostData } from '../../../../redux/ProjectDataSlice'

const CreateProject = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()
  const {id} = param;

  const projectData = useSelector(state => state.ProjectDataSlice.data)

  const [isLoading, setIsLoading] = useState(false)
  const [banners, setBanners] = useState([])
  const [fetchedBanners, setFetchedBanners] = useState([])
  const [deleteBanners, setDeleteBanners] = useState([])
  const [content, setContent] = useState([{
    head: '',
    body: ''
  }]);
  const [mainBannerPreview, setMainBannerPreview] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: '',
    date: Date.now(),
    heading: '',
    status: 'draft'
  })

  const form = useFormik({
    initialValues,
    onSubmit: async(formData) => {
      const formPayload = new FormData();

      formPayload.append("name", formData.name);
      formPayload.append("date", new Date());
      formPayload.append("type", formData.type);
      formPayload.append("heading", formData.heading);
      formPayload.append("status", formData.status);
      formPayload.append("mainBanner", formData?.mainBanner);
      formPayload.append("content", JSON.stringify(content))

      banners.forEach((banner, index) => {
        if (banner.banner) {
          formPayload.append(`banners`, banner.banner);
        }
      });
      
      // // Log the formPayload
      // const payloadObject = {};
      // formPayload.forEach((value, key) => {
      //   payloadObject[key] = value;
      // });
      // console.log("Form Payload:", payloadObject); // Log the payload

      setIsLoading(true)
      try {
        if(!id) {
          const response = await create(formPayload)
          if(response.success) {
            dispatch(handlePostData(response.data))
            navigate('/project')
            toast.success('Project is Created !!')
          } else {
            toast.error('Failed to create project.');
          }
        } else {
          formPayload.append("deleteBanners", JSON.stringify(deleteBanners))

          const response = await modify({formData: formPayload, id})
          if(response.success) {
            dispatch(handleModifyData(response.data))
            navigate('/project')
            toast.success('Project is Updated !!')
          } else {
            toast.error('Failed to update project.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while creating the project.');
      } finally {
        setIsLoading(false)
      }
    }
  })

  useEffect(()=>{
    if(id) {
      const data = projectData?.find(value => value._id === id)
      form.setValues(data)
      setContent(data?.content)
      setMainBannerPreview(data?.mainBanner?.s3Url)
      setFetchedBanners(data?.banners)
    }
  }, [id])

  // Handle main banner upload
  const handleMainBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setFieldValue("mainBanner", file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setMainBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fetchBanners = (data) => {
    setBanners(data)
  }
  
  return (
    <>
        <div className="container-fluid">
          <form onSubmit={form.handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header pt-4 pb-2">
                    <h6>Thumbnail</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="my-3">
                      <input type="text" value={form?.values?.name} onChange={form.handleChange} className="form-control" name="name" placeholder="Project Name" id="" />
                    </div>
                    <div className="my-3">
                      <input type="text" value={form?.values?.type} onChange={form.handleChange} className="form-control" name="type" placeholder="Project Type" id="" />
                    </div>
                    <div className="my-3">
                      <input type="file" onChange={handleMainBannerUpload} className="form-control" name="mainBanner" id="" />
                    </div>
                    <div className="my-3">
                      <input type="text" value={form?.values?.heading} onChange={form.handleChange} className="form-control" name="heading" placeholder="Main Header" id="" />
                    </div>
                  </div>
                </div>
                
                <Banners getBanners={fetchedBanners} deleteBanners={deleteBanners} setDeleteBanners={setDeleteBanners} fetchBanners={fetchBanners} /> 

                <Content content={content} setContent={setContent} />
              </div>
              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-header gtc-1-2 grid-cs">
                    <select className="form-control" name='status' value={form?.values?.status} onChange={form.handleChange} id="exampleFormControlSelect1">
                      <option value=''>Status</option>
                      <option value='active'>Active</option>
                      <option value='pending'>Pending</option>
                      <option value='draft'>Draft</option>
                    </select>
                    <button type='submit' disabled={isLoading} className='btn btn-primary btn-lg m-0'>Save Project {isLoading && <Spinner />}</button>
                  </div>
                </div>
                
                <Thumbnail img={mainBannerPreview} name={form?.values?.name} type={form?.values?.type} />

                <Preview />

              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default CreateProject