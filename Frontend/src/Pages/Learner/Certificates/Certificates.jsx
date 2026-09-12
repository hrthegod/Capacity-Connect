import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../api/apiClient";

import CertificatesHeader from "../../../Components/Learner/Certificates/CertificatesHeader/CertificatesHeader";
import CertificateOverview from "../../../Components/Learner/Certificates/CertificateOverview/CertificateOverview";
import CertificateList from "../../../Components/Learner/Certificates/CertificateList/CertificateList";
import CertificatesClosing from "../../../Components/Learner/Certificates/CertificatesClosing/CertificatesClosing";

import "./Certificates.css";

const Certificates = () => {
  const [realCerts, setRealCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiFetch("/certificates/my", {}, "LEARNER")
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) {
          const formatted = res.data.map((c) => ({
            id: String(c.id || c.certificate_number),
            certificateNumber: c.certificate_number || c.certificate_code || `CAP-${c.id}`,
            courseTitle: c.course_title || "Enrolled Course",
            category: c.category || "Observations",
            level: c.level || "Beginner",
            issuedAt: c.issued_at || c.issue_date || "Recently",
            completionDate: c.issued_at || c.issue_date || "Recently",
            learnerName: c.learner_name || "Learner",
            verification: { isVerified: true },
            score: 100,
            learningHours: 20,
            skills: [c.category || "Observations", "Capacity Building"],
            theme: "blue",
          }));
          setRealCerts(formatted);
        } else {
          setRealCerts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch learner certificates:", err);
        setRealCerts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const certificateStats = {
    totalCertificates: realCerts.length,
    verifiedCertificates: realCerts.length,
    completionRate: realCerts.length > 0 ? 100 : 0,
  };

  const latestCertificate = realCerts.length > 0 ? realCerts[0] : null;

  /* =========================================================
     HEADER ACTIONS
  ========================================================= */

  const handleViewLatestCertificate = (certificate) => {
    if (!certificate) {
      console.log("No latest certificate available.");
      return;
    }

    console.log("View latest certificate:", certificate);

    /*
      Later, when the certificate details page is created,
      this can become:

      navigate(`/learner/certificates/${certificate.id}`);
    */
  };

  const handleExploreCourses = () => {
    console.log("Explore more courses");

    /*
      Later, when course catalog routing is finalized,
      this can become:

      navigate("/learner/courses");
    */
  };

  /* =========================================================
     CLOSING SECTION ACTIONS
  ========================================================= */

  const handleBrowseLearningPaths = () => {
    console.log("Browse learning paths");

    /*
      Later, when Learning Paths routing is finalized,
      this can become:

      navigate("/learner/recommendations");
    */
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="certificates-page">
      <div className="certificates-page__container">
        {/* =====================================================
            SECTION 01
            CERTIFICATES HEADER
        ===================================================== */}

        <CertificatesHeader
          stats={certificateStats}
          latestCertificate={latestCertificate}
          onViewLatestCertificate={handleViewLatestCertificate}
          onExploreCourses={handleExploreCourses}
        />

        {/* =====================================================
            SECTION 02
            CERTIFICATE OVERVIEW
        ===================================================== */}

        <CertificateOverview
          stats={certificateStats}
          latestCertificate={latestCertificate}
          onExploreCourses={handleExploreCourses}
        />

        {/* =====================================================
            SECTION 03
            CERTIFICATE LIST
        ===================================================== */}

        <CertificateList certificates={realCerts} />

        {/* =====================================================
            SECTION 04
            CERTIFICATES CLOSING
        ===================================================== */}

        <CertificatesClosing
          stats={certificateStats}
          onExploreCourses={handleExploreCourses}
          onBrowseLearningPaths={handleBrowseLearningPaths}
        />
      </div>
    </main>
  );
};

export default Certificates;
