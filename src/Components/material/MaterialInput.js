import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./MaterialAndFurnituresForm.css";
import apiRequest from "../../utils/apiRequest";

const MaterialAndFurnituresForm = ({ setRole }) => {
  const [formData, setFormData] = useState({
    purchaseDate: "",
    particular: "",
    type: "",
    quantities: "",
    rate: "",
    orderBy: "",
    totalBillAmount: "",
    schoolName: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [getAllSchool, setGetAllSchool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const result = await apiRequest({
          endpoint: "school/getallschool.php",
          method: "GET",
          data: {},
        });

        if (result.status === "success") {
          // alert("Session creation completed");
          setGetAllSchool(result.data);
          console.log("result", result);
          // navigate("/dashboard");
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchSchoolData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.purchaseDate.trim())
      newErrors.purchaseDate = "Purchase date is required";
    if (!formData.particular.trim())
      newErrors.particular = "Particular is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.quantities.trim() || isNaN(formData.quantities))
      newErrors.quantities = "Enter a valid quantity";
    if (!formData.rate.trim() || isNaN(formData.rate))
      newErrors.rate = "Enter a valid rate";
    if (!formData.orderBy.trim()) newErrors.orderBy = "Order by is required";
    if (!formData.totalBillAmount.trim() || isNaN(formData.totalBillAmount))
      newErrors.totalBillAmount = "Enter a valid bill amount";
    if (!selectedSchool) newErrors.schoolName = "Please select a school";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    if (!validateForm()) return;
    e.preventDefault();
    let apidata = {
      purchase_date: formData.purchaseDate,
      particular: formData.particular,
      type: formData.type,
      quantities: Number(formData.quantities),
      rate: Number(formData.rate),
      order_by: formData.orderBy,
      bill_amount: Number(formData.totalBillAmount),
      school_name: "test",
      schoold_id: Number(selectedSchool),
    };
    try {
      const result = await apiRequest({
        endpoint: "materials/addmaterial.php",
        method: "POST",
        data: apidata,
      });
      console.log("result : ", result);
      if (result.status === "success") {
        alert("Material Creation completed");
        setRole("materialtable");
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
    console.log("Form Data:", formData);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Main Content */}
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Navbar />
      </div>
      <div style={{ flex: 1, paddingTop: "40px", position: "relative" }}>
        {/* Top-right profile */}

        {/* Form Title */}
        <h2 style={{ color: "#F75F00" }}>Material and Furnitures</h2>

        {/* Form */}
        <form onSubmit={handleSave} className="material-form">
          <div>
            <label>Purchase Date</label>
            <br />
            <input
              type="text"
              value={formData.purchaseDate}
              onChange={(e) => handleChange("purchaseDate", e.target.value)}
              style={inputStyle}
            />
            {errors.purchaseDate && (
              <div style={errorStyle}>{errors.purchaseDate}</div>
            )}
          </div>
          <div>
            <label>Particular</label>
            <br />
            <input
              type="text"
              value={formData.particular}
              onChange={(e) => handleChange("particular", e.target.value)}
              style={inputStyle}
            />
            {errors.particular && (
              <div style={errorStyle}>{errors.particular}</div>
            )}
          </div>
          <div>
            <label>Type</label>
            <br />
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              style={inputStyle}
            />
            {errors.type && <div style={errorStyle}>{errors.type}</div>}
          </div>
          <div>
            <label>Quantities</label>
            <br />
            <input
              type="text"
              value={formData.quantities}
              onChange={(e) => handleChange("quantities", e.target.value)}
              style={inputStyle}
            />
            {errors.quantities && (
              <div style={errorStyle}>{errors.quantities}</div>
            )}
          </div>
          <div>
            <label>Rate</label>
            <br />
            <input
              type="text"
              value={formData.rate}
              onChange={(e) => handleChange("rate", e.target.value)}
              style={inputStyle}
            />
            {errors.rate && <div style={errorStyle}>{errors.rate}</div>}
          </div>
          <div>
            <label>Order By</label>
            <br />
            <input
              type="text"
              value={formData.orderBy}
              onChange={(e) => handleChange("orderBy", e.target.value)}
              style={inputStyle}
            />
            {errors.orderBy && <div style={errorStyle}>{errors.orderBy}</div>}
          </div>
          <div>
            <label>Total Bill Amount</label>
            <br />
            <input
              type="text"
              value={formData.totalBillAmount}
              onChange={(e) => handleChange("totalBillAmount", e.target.value)}
              style={inputStyle}
            />
            {errors.totalBillAmount && (
              <div style={errorStyle}>{errors.totalBillAmount}</div>
            )}
          </div>
          <div>
            <label>School Name</label>
            <br />
            <select
              style={{ ...inputStyle, backgroundColor: "white" }}
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">School</option>
              {getAllSchool.map((school) => (
                <option value={school.id}>{school.school_name}</option>
              ))}
            </select>
            {errors.schoolName && (
              <div style={errorStyle}>{errors.schoolName}</div>
            )}
          </div>
        </form>

        {/* Save Button */}
        <div
          style={{
            marginTop: "40px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#1a1a56",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "10px 0",
              fontSize: "16px",
              cursor: "pointer",
              width: 150,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "90%",
  padding: "10px 15px",
  borderRadius: "20px",
  border: "1px solid #ccc",
  marginTop: "5px",
};
const errorStyle = {
  color: "red",
  fontSize: "14px",
  marginTop: "5px",
};

export default MaterialAndFurnituresForm;
