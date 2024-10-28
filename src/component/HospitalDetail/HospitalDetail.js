import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './HospitalDetail.module.css';

const HospitalDetail = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHospitalDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://apis.data.go.kr/B552657/HsptlAsembySearchService/hospitals/${id}`);
        setHospital(response.data);
        setLoading(false);
      } catch (err) {
        setError('병원 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchHospitalDetail();
  }, [id]);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!hospital) return <div className={styles.notFound}>병원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.hospitalDetail}>
      <h1>{hospital.name}</h1>
      <div className={styles.info}>
        <p><strong>주소:</strong> {hospital.address}</p>
        <p><strong>전화번호:</strong> {hospital.phone}</p>
        <p><strong>운영 시간:</strong> {hospital.hours}</p>
      </div>
      <div className={styles.services}>
        <h2>제공 서비스</h2>
        <ul>
          {hospital.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      <div className={styles.doctors}>
        <h2>의료진 정보</h2>
        {hospital.doctors.map((doctor, index) => (
          <div key={index} className={styles.doctor}>
            <h3>{doctor.name}</h3>
            <p><strong>전문 분야:</strong> {doctor.speciality}</p>
            <p>{doctor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDetail;