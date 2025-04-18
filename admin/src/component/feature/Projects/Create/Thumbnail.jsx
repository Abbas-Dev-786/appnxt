
const Thumbnail = ({ name, img, type }) => {
  return (
    <>
        <div className="card my-3">
            <div className="card-body py-2">
                <div className="project-card">
                    <div className='img'>
                        {img && (
                            <img
                            src={img}
                            alt="Main Banner Preview"
                            style={{ maxWidth: "100%" }}
                            />
                        )}
                    </div>
                    <div className="footer">
                        <h6 className='m-0'>{type || 'PROJECT TYPE'}</h6>
                        <h5>{name || 'PROJECT NAME'}</h5>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Thumbnail