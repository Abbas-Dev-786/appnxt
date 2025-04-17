const Advertise = ({ bg, img, padding, imgHeight, objectFit }) => {
  return (
    <>
        <div className="portfolio"
            style={{ backgroundColor: bg ? `#${bg}` : 'transparent', padding: padding !== 0 ? padding : 0 }}
        >
            <img src={img} style={{ objectFit: objectFit ? objectFit : 'cover' }} alt="" />
        </div>
    </>
  )
}

export default Advertise