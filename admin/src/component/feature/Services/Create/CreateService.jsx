import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { create, fetchServices, modify } from '../../../../services/ServiceService'
import Spinner from '../../../shared/Spinner/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Banners from './Banners'
import Content from './Content'
import { useDispatch, useSelector } from 'react-redux'
import { handleModifyData, handlePostData } from '../../../../redux/ServiceDataSlice'
import Category from '../Category/Category'


const CreateService = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()
  const {id} = param;

  const serviceData = useSelector(state => state.ServiceDataSlice.data)
  const categories = useSelector(state => state.ServiceDataSlice.category);


  const [isLoading, setIsLoading] = useState(false)
  const [banners, setBanners] = useState()
  const [fetchedBanners, setFetchedBanners] = useState()
  const [deleteBanners, setDeleteBanners] = useState()
  const [content, setContent] = useState([{
    heading: '',
    description: ''
  }]);
  const [sliderContent, setSliderContent] = useState([{
    heading: '',
    description: ''
  }]);
  const [initialValues, setInitialValues] = useState({
    status: '',
    name: '',
    url: '',
    link: {
      category: '',
      name: '',
      url: ''
    },
    heading: '',
    description: '',
    content: {
      heading: '',
      description: ''
    },
    sliderHeading: '',
    sliderDescription: '',
    slides: [],
    banner: null
  })

  const form = useFormik({
    initialValues,
    onSubmit: async(formData) => {
      const formPayload = new FormData();

      // Add basic fields
      formPayload.append("status", formData.status);
      formPayload.append("heading", formData.heading);
      formPayload.append("description", formData.description);

      // Add link object
      const linkData = {
        category: formData.link.category,
        name: formData.link.name,
        url: formData.link.url
      };
      formPayload.append("link", JSON.stringify(linkData));

      // Add content object
      const contentData = {
        heading: formData.content.heading,
        description: formData.content.description
      };
      formPayload.append("content", JSON.stringify(contentData));

      // Add slider object
      const sliderData = {
        heading: sliderContent?.heading,
        description: sliderContent?.description,
        slides: content || []
      };
      formPayload.append("slider", JSON.stringify(sliderData));

      // Add banner if exists
      if (banners) {
        formPayload.append("banner", banners);
      }

            // Log the formPayload
      // const payloadObject = {};
      // formPayload.forEach((value, key) => {
      //   payloadObject[key] = value;
      // });
      // console.log("Form Payload:", payloadObject); // Log the payload

      setIsLoading(true);
      try {
        if(!id) {
          const response = await create(formPayload);
          if(response.success) {
            dispatch(handlePostData(response.data));
            navigate('/services');
            toast.success('Service is Created !!');
          } else {
            toast.error('Failed to create service.');
          }
        } else {
          // Add deleteBanner flag if updating
          // if (deleteBanner) {
          //   formPayload.append("deleteBanner", "true");
          // }

          const response = await modify({formData: formPayload, id});
          if(response.success) {
            dispatch(handleModifyData(response.data));
            navigate('/services');
            toast.success('Service is Updated !!');
          } else {
            toast.error('Failed to update service.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while processing the service.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  useEffect(()=>{
    if(id) {
      const data = serviceData?.find(value => value._id === id)
      form.setValues(data)
      setContent(data?.slider?.slides)
      setSliderContent({heading: data?.slider?.heading, description: data?.slider?.description})
      setFetchedBanners(data?.banner)
    }
  }, [id])

  const fetchBanners = (data) => {
    setBanners(data)
  }


  return (
    <>
        <div className="container-fluid">
          <form onSubmit={form.handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="grid-cs">

                <div className="card">
                  <div className="card-header pt-4 pb-2">
                    <h6>About Service</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="my-3">
                      <input type="text" value={form?.values?.heading} onChange={form.handleChange} className="form-control" name="heading" placeholder="Service Name" id="" />
                    </div>
                    <div className="my-3">
                      <input type="text" value={form?.values?.description} onChange={form.handleChange} className="form-control" name="description" placeholder="Service Description" id="" />
                    </div>
                    <div className="my-3">
                      <input type="date" value={form?.values?.date} onChange={form.handleChange} className="form-control" name="date" placeholder="Main Header" id="" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header pt-4 pb-2">
                    <h6>Service Link</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="my-3">
                      <select 
                        name="link.category" 
                        value={form.values.link?.category || ''} 
                        onChange={form.handleChange} 
                        className="form-control" 
                        id=""
                      >
                        <option value="">Select Category</option>
                        {categories?.map((category, index) => (
                          <option value={category} key={index}>{category}</option>    
                        ))}
                      </select>
                    </div>
                    <div className="my-3">
                      <input 
                        type="text" 
                        value={form.values.link?.name || ''} 
                        onChange={form.handleChange} 
                        className="form-control" 
                        name="link.name" 
                        placeholder="Link Name" 
                      />
                    </div>
                    <div className="my-3">
                      <input 
                        type="text" 
                        value={form.values.link?.url || ''} 
                        onChange={form.handleChange} 
                        className="form-control" 
                        name="link.url" 
                        placeholder="Link Url" 
                      />
                    </div>
                  </div>
                </div>

                </div>
                
                <Banners getBanners={fetchedBanners} deleteBanners={deleteBanners} setDeleteBanners={setDeleteBanners} fetchBanners={fetchBanners} /> 

                <Content content={content} setSliderContent={setSliderContent} sliderContent={sliderContent} setContent={setContent} />
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

                <div className="card">
                  <div className="card-header pt-4 pb-2">
                    <h6>Service Content</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="my-3">
                      <input 
                        type="text" 
                        value={form.values.content.heading || ''} 
                        onChange={form.handleChange} 
                        className="form-control" 
                        name="content.heading" 
                        placeholder="Content Title" 
                      />
                    </div>
                    <div className="my-3">
                      <input 
                        type="text" 
                        value={form.values.content.description || ''} 
                        onChange={form.handleChange} 
                        className="form-control" 
                        name="content.description" 
                        placeholder="Content Description" 
                      />
                    </div>
                  </div>
                </div>

                <Category />
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default CreateService