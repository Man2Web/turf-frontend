import React from "react";

const GalleryDetails = ({
  errors,
  handleFileChange,
  removeImg,
  images,
}: {
  errors: any;
  handleFileChange: any;
  removeImg: any;
  images: any;
}) => {
  return (
    <div className="accordion-item mb-4" id="gallery">
      <h4 className="accordion-header" id="panelsStayOpen-gallery">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseEight"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseEight"
        >
          Gallery
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseEight"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-gallery"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-md-12">
              <div className="file-upload-text appointment-upload">
                <div className="input-space">
                  <label className="form-label">Your Venue Images</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="file-input"
                      className="image-upload"
                      multiple
                      onChange={handleFileChange}
                    />
                    <p>Upload Court Images</p>
                  </div>
                </div>
                <div className="upload-show-img">
                  {images.map(
                    (
                      imgObj: { file: File; url: string },
                      index: React.Key | null | undefined
                    ) => (
                      <div key={index} className="upload-images">
                        <img
                          src={imgObj.url}
                          className="img-fluid"
                          alt={`Preview ${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImg(index)}
                          className="btn btn-icon btn-sm"
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                      </div>
                    )
                  )}
                  {errors?.courtImages === 0 && (
                    <p className="text-danger">{errors?.courtImages}</p>
                  )}
                </div>
                <h5>
                  Put the main picture as the first Image <br />
                  Image Should be minimum 152 * 152 Supported File formats JPG,
                  PNG, SVG
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
