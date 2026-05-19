import { useState } from "react";
import emailjs from "@emailjs/browser";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import reception from "./assets/unnamed.jpg";
import logo from "./assets/Cedar-logo-01.png";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    tel1: "",
    tel2: "",
    email: "",
    gender: "",
    maritalStatus: "",
    allergies: "",
    currentAddress: "",
    permanentAddress: "",
    nationality: "",
    stateOfOrigin: "",
    occupation: "",
    religion: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyAddress: "",
    nextOfKin: "",
    referral: "",
    insuranceName: "",
    insuranceId: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ✅ ADDED

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ ADDED

    const newErrors = {};

    const requiredFields = [
      "fullName",
      "dob",
      "tel1",
      "gender",
      "maritalStatus",
      "currentAddress",
      "nationality",
      "stateOfOrigin",
      "emergencyName",
      "emergencyPhone",
      "nextOfKin"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowError(true);
      setLoading(false); // ✅ ADDED

      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => setShowError(false), 2500);
      return;
    }

    try {
      await emailjs.send(
        "CedarReception",
        "template_fiqxapn",
        formData,
        "w1kNpp7UrLBEA8YQp"
      );

      await addDoc(collection(db, "patients"), {
        ...formData,
        createdAt: new Date()
      });

      setShowSuccess(true);
      setLoading(false); // ✅ ADDED

      setTimeout(() => {
        setShowSuccess(false);
      }, 2500);

      setFormData({
        fullName: "",
        dob: "",
        tel1: "",
        tel2: "",
        email: "",
        gender: "",
        maritalStatus: "",
        allergies: "",
        currentAddress: "",
        permanentAddress: "",
        nationality: "",
        stateOfOrigin: "",
        occupation: "",
        religion: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyAddress: "",
        nextOfKin: "",
        referral: "",
        insuranceName: "",
        insuranceId: ""
      });

      setErrors({});
    } catch (error) {
      console.error(error);
      setShowError(true);
      setLoading(false); // ✅ ADDED

      setTimeout(() => {
        setShowError(false);
      }, 2500);
    }
  };

  const inputStyle = (name) => ({
    ...styles.input,
    border: errors[name]
      ? "2px solid red"
      : "1px solid rgba(255,255,255,0.3)"
  });

  const textareaStyle = (name) => ({
    ...styles.textarea,
    border: errors[name]
      ? "2px solid red"
      : "1px solid rgba(255,255,255,0.3)"
  });

  const selectStyle = (name) => ({
    ...styles.select,
    border: errors[name]
      ? "2px solid red"
      : "1px solid rgba(255,255,255,0.3)"
  });

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>

      <div style={styles.card}>
        <div style={styles.headerRow}>
          <img src={logo} alt="Hospital Logo" style={styles.logo} />
          <h1 style={styles.title}>CEDAR GROUP HOSPITAL</h1>
        </div>

        <h2 style={styles.title}>Patient Biodata Form</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={inputStyle("fullName")} name="fullName" placeholder="Full Name*" value={formData.fullName} onChange={handleChange} />
          <input style={inputStyle("dob")} name="dob" placeholder="Date of Birth*" type="date" value={formData.dob} onChange={handleChange} />
          <input style={inputStyle("tel1")} name="tel1" placeholder="Phone Number 1*" value={formData.tel1} onChange={handleChange} />
          <input style={inputStyle("tel2")} name="tel2" placeholder="Phone Number 2" value={formData.tel2} onChange={handleChange} />
          <input style={inputStyle("email")} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

          <select style={selectStyle("gender")} name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender*</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select style={selectStyle("maritalStatus")} name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Marital Status*</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>

          <textarea style={textareaStyle("allergies")} name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />

          <textarea style={textareaStyle("currentAddress")} name="currentAddress" placeholder="Current Address*" value={formData.currentAddress} onChange={handleChange} />

          <textarea style={textareaStyle("permanentAddress")} name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} />

          <input style={inputStyle("nationality")} name="nationality" placeholder="Nationality*" value={formData.nationality} onChange={handleChange} />

          <input style={inputStyle("stateOfOrigin")} name="stateOfOrigin" placeholder="State of Origin*" value={formData.stateOfOrigin} onChange={handleChange} />

          <input style={inputStyle("occupation")} name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />

          <input style={inputStyle("religion")} name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} />

          <input style={inputStyle("emergencyName")} name="emergencyName" placeholder="Emergency Contact Name*" value={formData.emergencyName} onChange={handleChange} />

          <input style={inputStyle("emergencyPhone")} name="emergencyPhone" placeholder="Emergency Contact Phone*" value={formData.emergencyPhone} onChange={handleChange} />

          <textarea style={textareaStyle("emergencyAddress")} name="emergencyAddress" placeholder="Emergency Contact Address" value={formData.emergencyAddress} onChange={handleChange} />

          <input style={inputStyle("nextOfKin")} name="nextOfKin" placeholder="Next of Kin*" value={formData.nextOfKin} onChange={handleChange} />

          <select style={selectStyle("referral")} name="referral" value={formData.referral} onChange={handleChange}>
            <option value="">How did you hear about us?</option>
            <option>Doctor Referral</option>
            <option>Insurance Provider</option>
            <option>Emergency Visit</option>
            <option>Social Media</option>
            <option>Previous Patient</option>
            <option>Family/Friend</option>
            <option>Other</option>
          </select>

          <input style={inputStyle("insuranceName")} name="insuranceName" placeholder="Insurance Name" value={formData.insuranceName} onChange={handleChange} />

          <input style={inputStyle("insuranceId")} name="insuranceId" placeholder="Insurance ID" value={formData.insuranceId} onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>✅ Submitted Successfully!</h2>
          </div>
        </div>
      )}

      {showError && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ color: "red" }}>
              ❌ Please fill all required fields before submitting.
            </h2>
          </div>
        </div>
      )}
            {loading && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.spinner}></div>
            <h3>Submitting...</h3>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {  
  minHeight: "100%",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",

  },

  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${reception})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(3px)",
    transform: "scale(1.05)",
    zIndex: -1
  },

  card: {
  width: "100%",
  maxWidth: "650px",
  background: "rgba(92, 55, 108, 0.34)",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.25)"

  },

  headerRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    gap: "0px",
    width: "100%",
    marginTop: "10px",
    WebkitTextStroke: "1px purple",
    textShadow: "0px 2px 4px rgba(227, 81, 222, 0.5)"
  },

  logo: {
    width: "90px",
    height: "90px",
    objectFit: "contain"
  },

  title: {
    textAlign: "center",
    color: "#fbfafb"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(9, 9, 9, 0.52)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(9, 9, 9, 0.52)",
    color: "#fff",
    minHeight: "80px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },

  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(9, 9, 9, 0.52)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#0077b6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  spinner: {
  width: "40px",
  height: "40px",
  border: "4px solid rgba(255,255,255,0.3)",
  borderTop: "4px solid #0077b6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto 10px"
},

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  modal: {
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    color: "#2c3e50",
    fontSize: 12,
    Width: "auto",
    minWidth: "150px"
  }
};

export default App;