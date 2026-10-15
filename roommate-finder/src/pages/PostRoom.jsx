import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const sampleImages = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
];

const PostRoom = () => {
  const { addRoom, showToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Apartment',
    address: '',
    city: 'Ahmedabad',
    rent: '',
    securityDeposit: '',
    roomType: 'Private Room',
    bedrooms: 2,
    bathrooms: 2,
    furnished: 'Furnished',
    availableDate: new Date().toISOString().split('T')[0],
    amenities: ['Wi-Fi', 'AC', 'Kitchen'],
    genderPreference: 'Any',
    ageRange: '20-35',
    smokingAllowed: 'No',
    petsAllowed: 'No',
    description: '',
    selectedImage: sampleImages[0]
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState(false);

  const availableAmenitiesList = [
    'Wi-Fi',
    'AC',
    'Parking',
    'Washing Machine',
    'Kitchen',
    'Balcony',
    'TV',
    'Security'
  ];

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          selectedImage: uploadEvent.target.result
        }));
        showToast('Image uploaded successfully!', 'info', 'bi-image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.rent || !formData.city) {
      showToast('Please fill all required fields.', 'warning', 'bi-exclamation-triangle');
      return;
    }

    const houseRules = [];
    if (formData.smokingAllowed === 'No') houseRules.push('No smoking inside the premises');
    else houseRules.push('Smoking permitted in designated balcony area');

    if (formData.petsAllowed === 'No') houseRules.push('No pets allowed');
    else houseRules.push('Pet friendly');

    houseRules.push('Quiet hours after 10:30 PM');
    houseRules.push('Keep common living and kitchen spaces clean');

    const newListing = {
      title: formData.title,
      propertyType: formData.propertyType,
      city: formData.city,
      location: formData.address || `${formData.city} Central`,
      rent: Number(formData.rent),
      securityDeposit: Number(formData.securityDeposit) || Number(formData.rent) * 2,
      roomType: formData.roomType,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      furnished: formData.furnished,
      availableDate: formData.availableDate,
      amenities: formData.amenities,
      genderPreference: formData.genderPreference,
      description: formData.description || 'Newly listed room with convenient connectivity, clean environment, and friendly roommates.',
      images: [formData.selectedImage, ...sampleImages.slice(1, 3)],
      houseRules
    };

    addRoom(newListing);
    setSubmittedAlert(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      navigate('/rooms');
    }, 2200);
  };

  return (
    <div className="post-room-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-4">
          <span className="badge bg-primary-light text-primary-custom rounded-pill px-3 py-1.5 fw-bold mb-2">
            <i className="bi bi-plus-circle-fill me-1"></i> List Your Space
          </span>
          <h2 className="fw-bold mb-1">Post a Room or Flat</h2>
          <p className="text-secondary mb-0">
            Reach verified prospective housemates and tenants without paying any middleman brokerage.
          </p>
        </div>

        {/* Success Alert */}
        {submittedAlert && (
          <div className="alert alert-success alert-dismissible fade show rounded-4 p-4 shadow-sm mb-4" role="alert">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-check-circle-fill fs-2 text-success"></i>
              <div>
                <h5 className="alert-heading fw-bold mb-1">Your room listing has been created successfully!</h5>
                <p className="mb-0 text-success-emphasis">
                  Your listing is live on RoomMate. Redirecting you to the rooms directory...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <form onSubmit={handleSubmit} className="card modern-card p-4 p-md-5 bg-white">
              {/* 1. Property Information */}
              <div className="mb-4 pb-3 border-bottom">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                  Property Information
                </h5>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold text-secondary">Property Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Spacious Master Bedroom with Attached Bath in Bodakdev"
                      className="form-control rounded-3 shadow-none"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Property Type</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Flat">Flat</option>
                      <option value="House">House / Villa</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">City *</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold text-secondary">Complete Address / Landmark</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="e.g. Near Iscon Cross Roads, Bodakdev, SG Highway"
                      className="form-control rounded-3 shadow-none"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Monthly Rent (₹ INR) *</label>
                    <input
                      type="number"
                      name="rent"
                      required
                      min="1000"
                      placeholder="e.g. 14000"
                      className="form-control rounded-3 shadow-none"
                      value={formData.rent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Security Deposit (₹ INR)</label>
                    <input
                      type="number"
                      name="securityDeposit"
                      placeholder="e.g. 28000"
                      className="form-control rounded-3 shadow-none"
                      value={formData.securityDeposit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Room Information */}
              <div className="mb-4 pb-3 border-bottom">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                  Room Information
                </h5>

                <div className="row g-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Room Type</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                    >
                      <option value="Private Room">Private Room</option>
                      <option value="Shared Room">Shared Room</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Furnishing</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="furnished"
                      value={formData.furnished}
                      onChange={handleChange}
                    >
                      <option value="Furnished">Furnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>
                  </div>

                  <div className="col-md-4 col-6">
                    <label className="form-label small fw-bold text-secondary">Total Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      min="1"
                      max="10"
                      className="form-control rounded-3 shadow-none"
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 col-6">
                    <label className="form-label small fw-bold text-secondary">Total Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      min="1"
                      max="10"
                      className="form-control rounded-3 shadow-none"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 col-12">
                    <label className="form-label small fw-bold text-secondary">Available From</label>
                    <input
                      type="date"
                      name="availableDate"
                      className="form-control rounded-3 shadow-none"
                      value={formData.availableDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Amenities */}
              <div className="mb-4 pb-3 border-bottom">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                  Amenities Available
                </h5>

                <div className="row g-2">
                  {availableAmenitiesList.map((amenity) => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <div key={amenity} className="col-md-3 col-6">
                        <div
                          className={`p-2.5 rounded-3 border cursor-pointer d-flex align-items-center gap-2 ${
                            isChecked ? 'border-primary bg-primary-light text-primary-custom fw-semibold' : 'bg-light text-secondary'
                          }`}
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="form-check-input mt-0 shadow-none"
                          />
                          <span className="small">{amenity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Housemate Preferences */}
              <div className="mb-4 pb-3 border-bottom">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                  Housemate Preferences
                </h5>

                <div className="row g-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Preferred Gender</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="genderPreference"
                      value={formData.genderPreference}
                      onChange={handleChange}
                    >
                      <option value="Any">Any / No Preference</option>
                      <option value="Female Only">Female Only</option>
                      <option value="Male Only">Male Only</option>
                    </select>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Preferred Age Range</label>
                    <input
                      type="text"
                      name="ageRange"
                      placeholder="e.g. 21 - 32"
                      className="form-control rounded-3 shadow-none"
                      value={formData.ageRange}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Smoking Allowed?</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="smokingAllowed"
                      value={formData.smokingAllowed}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes (Balcony only)</option>
                    </select>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label small fw-bold text-secondary">Pets Allowed?</label>
                    <select
                      className="form-select rounded-3 shadow-none"
                      name="petsAllowed"
                      value={formData.petsAllowed}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Photos */}
              <div className="mb-4 pb-3 border-bottom">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
                  Property Photos
                </h5>

                <div className="upload-dropzone mb-3 position-relative">
                  <i className="bi bi-cloud-arrow-up-fill fs-1 text-primary-custom d-block mb-2"></i>
                  <h6 className="fw-bold mb-1">Click to browse or drop property photos</h6>
                  <p className="small text-secondary mb-3">Supports JPG, PNG, WebP up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="position-absolute inset-0 opacity-0 cursor-pointer w-100 h-100"
                    style={{ top: 0, left: 0 }}
                    onChange={handleImageFileChange}
                  />
                </div>

                <div className="mt-2">
                  <span className="small text-muted fw-bold d-block mb-2">Or choose from sample demo photos:</span>
                  <div className="row g-2">
                    {sampleImages.map((img, idx) => (
                      <div key={idx} className="col-3">
                        <div
                          className={`rounded-3 overflow-hidden cursor-pointer border ${formData.selectedImage === img ? 'border-primary border-3' : 'opacity-75'}`}
                          style={{ height: '70px' }}
                          onClick={() => setFormData({ ...formData, selectedImage: img })}
                        >
                          <img src={img} alt="Sample option" className="w-100 h-100 object-fit-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Description */}
              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <span className="badge bg-primary-custom rounded-circle p-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>6</span>
                  Detailed Description
                </h5>

                <textarea
                  rows="4"
                  name="description"
                  required
                  placeholder="Describe the room, furniture, sunlight, nearby metro/bus access, cooking setup, and what you are looking for in a prospective roommate..."
                  className="form-control rounded-3 shadow-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Preview Toggle Box */}
              {isPreviewOpen && (
                <div className="p-4 bg-light rounded-4 border mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0 text-primary-custom">Live Listing Preview</h6>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => setIsPreviewOpen(false)}
                    >
                      Hide Preview
                    </button>
                  </div>
                  <div className="row align-items-center g-3">
                    <div className="col-md-4">
                      <img src={formData.selectedImage} alt="Preview" className="w-100 rounded-3 object-fit-cover" style={{ height: '160px' }} />
                    </div>
                    <div className="col-md-8">
                      <h5 className="fw-bold mb-1">{formData.title || 'Untitled Room Listing'}</h5>
                      <span className="text-secondary small d-block mb-1">{formData.address || 'Address'} • {formData.city}</span>
                      <div className="fs-5 fw-extrabold text-primary-custom mb-2">₹{formData.rent ? Number(formData.rent).toLocaleString('en-IN') : '0'}/month</div>
                      <div className="d-flex flex-wrap gap-1">
                        <span className="badge bg-primary-custom">{formData.roomType}</span>
                        <span className="badge bg-secondary">{formData.furnished}</span>
                        <span className="badge bg-dark">{formData.propertyType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-semibold"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                >
                  <i className="bi bi-eye-fill me-1"></i> {isPreviewOpen ? 'Close Preview' : 'Preview Listing'}
                </button>

                <button
                  type="submit"
                  className="btn btn-primary-custom rounded-pill px-5 py-2.5 fw-bold fs-6"
                >
                  <i className="bi bi-cloud-arrow-up-fill me-1"></i> Post Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRoom;
