import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashboard.css'; 

function Dashboard() {
  const [imagePaths, setImagePaths] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/file`);
      setFileList(res.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    const fetchImagePaths = () => {
      try {
        const imagesFolder = '/images';
        const paths = fileList.map((file) => `${imagesFolder}/${file.file_name}`);
        setImagePaths(paths);
      } catch (error) {
        console.error('Error fetching image paths:', error);
      }
    };

    fetchImagePaths();
  }, [fileList]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length);
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="slider-container">
        <button className="arrow-btn prev" onClick={handlePrevImage} style={{color:"black"}}>Prev</button>
        <div className="slider-track" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {imagePaths.map((imagePath, index) => (
            <img
              key={index}
              className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
              src={imagePath}
              alt={`Image ${index + 1}`}
              height={600}
            />
          ))}
        </div>
        <button className="arrow-btn next" onClick={handleNextImage} style={{color:"black"}}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;

