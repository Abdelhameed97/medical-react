"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, Stethoscope, FileText, CheckCircle2, Edit, X, Save, Shield, Camera } from "lucide-react"
import axios from "axios"

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: "rehab",
    email: "rehab@gmail.com",
    phone: "01013102431",
    specialty: "ثدوي",
    bio: "hello i am rehab kamal",
  })
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [editing, setEditing] = useState(false)

  const doctorId = 1

  useEffect(() => {
    axios.get(`http://localhost:5000/doctors/${doctorId}`).then((res) => {
      setProfile(res.data)
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/doctors/${doctorId}`, profile)
      .then(() => {
        setOpenSuccessModal(true)
        setEditing(false)
      })
      .catch(() => alert("Error updating profile"))
  }

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false)
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const styles = {
    container: {
      padding: "0",
      backgroundColor: "#f1f5f9",
      minHeight: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBackdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      position: "relative",
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      padding: "40px",
      maxWidth: "450px",
      width: "90%",
      margin: "16px",
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "none",
      border: "none",
      color: "#9ca3af",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "50%",
      transition: "all 0.2s ease",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "#dcfce7",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      boxShadow: "0 10px 25px rgba(16, 185, 129, 0.2)",
    },
    card: {
      maxWidth: "1200px",
      margin: "0 auto",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      backgroundColor: "white",
    },
    header: {
      background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)",
      padding: "60px 40px",
      textAlign: "center",
      color: "white",
      position: "relative",
      overflow: "hidden",
    },
    headerPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
    },
    avatarContainer: {
      position: "relative",
      display: "inline-block",
      marginBottom: "24px",
    },
    avatar: {
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      border: "6px solid white",
      backgroundColor: "white",
      color: "#8b5cf6",
      fontSize: "56px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      position: "relative",
      zIndex: 2,
    },
    cameraIcon: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
      backgroundColor: "#8b5cf6",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
      transition: "all 0.2s ease",
      zIndex: 3,
    },
    profileName: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "8px",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "relative",
      zIndex: 2,
    },
    specialty: {
      fontSize: "20px",
      marginBottom: "16px",
      opacity: "0.9",
      position: "relative",
      zIndex: 2,
    },
    verifiedBadge: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      color: "white",
      padding: "8px 16px",
      borderRadius: "25px",
      fontSize: "14px",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      position: "relative",
      zIndex: 2,
    },
    content: {
      padding: "48px",
      backgroundColor: "white",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
      marginBottom: "32px",
    },
    formGridThree: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginBottom: "0",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "24px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.3s ease",
      backgroundColor: "white",
      fontFamily: "inherit",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    },
    textarea: {
      width: "100%",
      padding: "20px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.3s ease",
      resize: "vertical",
      fontFamily: "inherit",
      backgroundColor: "white",
      minHeight: "120px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    },
    displayValue: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#1f2937",
      lineHeight: "1.6",
      padding: "16px 20px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
      paddingTop: "32px",
      borderTop: "2px solid #f1f5f9",
    },
    button: {
      padding: "16px 32px",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    editButton: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
    },
    saveButton: {
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "white",
    },
    cancelButton: {
      backgroundColor: "white",
      color: "#6b7280",
      border: "2px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    continueButton: {
      background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      color: "white",
      padding: "16px 40px",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
    },
    sectionSpacing: {
      marginBottom: "24px",
    },
  }

  return (
    <div style={styles.container}>
      {/* Success Modal */}
      {openSuccessModal && (
        <div style={styles.modal}>
          <div style={styles.modalBackdrop} onClick={handleCloseSuccessModal}></div>
          <div style={styles.modalContent}>
            <button
              style={styles.closeButton}
              onClick={handleCloseSuccessModal}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f3f4f6"
                e.target.style.color = "#374151"
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent"
                e.target.style.color = "#9ca3af"
              }}
            >
              <X size={24} />
            </button>

            <div style={styles.successIcon}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "12px" }}>
              Profile Updated Successfully!
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "32px", fontSize: "16px", lineHeight: "1.6" }}>
              Your profile information has been saved and updated successfully.
            </p>
            <button
              style={styles.continueButton}
              onClick={handleCloseSuccessModal}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.4)"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)"
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div style={styles.card}>
        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.headerPattern}></div>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>{profile.name.charAt(0).toUpperCase()}</div>
            <div
              style={styles.cameraIcon}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)"
                e.target.style.backgroundColor = "#7c3aed"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)"
                e.target.style.backgroundColor = "#8b5cf6"
              }}
            >
              <Camera size={20} />
            </div>
          </div>

          <h2 style={styles.profileName}>{profile.name}</h2>
          <p style={styles.specialty}>{profile.specialty}</p>

          <div style={styles.verifiedBadge}>
            <Shield size={16} />
            Verified Doctor
          </div>
        </div>

        {/* Profile Content */}
        <div style={styles.content}>
          {editing ? (
            <>
              {/* First Row - Name, Email, Phone */}
              <div style={styles.sectionSpacing}>
                <div style={styles.formGridThree}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                      <User size={18} color="#8b5cf6" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      style={styles.input}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#8b5cf6"
                        e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                      <Mail size={18} color="#8b5cf6" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      style={styles.input}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#8b5cf6"
                        e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                      <Phone size={18} color="#8b5cf6" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      style={styles.input}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#8b5cf6"
                        e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Second Row - Specialty */}
              <div style={styles.sectionSpacing}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    <Stethoscope size={18} color="#8b5cf6" />
                    Medical Specialty
                  </label>
                  <input
                    type="text"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    placeholder="Enter your specialty"
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6"
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0"
                      e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"
                    }}
                  />
                </div>
              </div>

              {/* Third Row - Bio */}
              <div style={styles.sectionSpacing}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    <FileText size={18} color="#8b5cf6" />
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your experience, qualifications, and expertise..."
                    rows={5}
                    style={styles.textarea}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6"
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0"
                      e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={styles.sectionSpacing}>
                <div style={styles.formGridThree}>
                  <div style={styles.fieldGroup}>
                    <div style={styles.label}>
                      <User size={18} color="#8b5cf6" />
                      Full Name
                    </div>
                    <div style={styles.displayValue}>{profile.name}</div>
                  </div>

                  <div style={styles.fieldGroup}>
                    <div style={styles.label}>
                      <Mail size={18} color="#8b5cf6" />
                      Email Address
                    </div>
                    <div style={styles.displayValue}>{profile.email}</div>
                  </div>

                  <div style={styles.fieldGroup}>
                    <div style={styles.label}>
                      <Phone size={18} color="#8b5cf6" />
                      Phone Number
                    </div>
                    <div style={styles.displayValue}>{profile.phone}</div>
                  </div>
                </div>
              </div>

              <div style={styles.sectionSpacing}>
                <div style={styles.fieldGroup}>
                  <div style={styles.label}>
                    <Stethoscope size={18} color="#8b5cf6" />
                    Medical Specialty
                  </div>
                  <div style={styles.displayValue}>{profile.specialty}</div>
                </div>
              </div>

              <div style={styles.sectionSpacing}>
                <div style={styles.fieldGroup}>
                  <div style={styles.label}>
                    <FileText size={18} color="#8b5cf6" />
                    Professional Bio
                  </div>
                  <div style={styles.displayValue}>{profile.bio}</div>
                </div>
              </div>
            </>
          )}

          <div style={styles.buttonContainer}>
            {editing ? (
              <>
                <button
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onClick={() => setEditing(false)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f9fafb"
                    e.target.style.transform = "translateY(-2px)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white"
                    e.target.style.transform = "translateY(0)"
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{ ...styles.button, ...styles.saveButton }}
                  onClick={handleSave}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.4)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                >
                  <Save size={18} />
                  Save Profile
                </button>
              </>
            ) : (
              <button
                style={{ ...styles.button, ...styles.editButton }}
                onClick={handleEdit}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)"
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
