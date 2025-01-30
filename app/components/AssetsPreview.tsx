"use client"; 
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

type AssetsPreviewProps = {
  assetUrls: string[];
};

const Modal: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative flex flex-col items-center overflow-hidden border rounded-lg shadow-xl shadow-gray-500/20">
        <div className="flex gap-2 absolute right-2.5">
          <a href={src} target="_blank" download className="text-lg cursor-pointer">
            <FontAwesomeIcon icon={faDownload} /> {/* Download Icon */}
          </a>
          <div className="self-end text-2xl cursor-pointer" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <Image 
          src={src} 
          alt={`Asset`} 
          width={550}
          height={550}
          className="max-h-[80vh] max-w-[80vw]"
          priority={true}
          placeholder="blur"
          blurDataURL="/low-res-placeholder.jpg"
        />
      </div>
    </div>
  );
};

const AssetsPreview: React.FC<AssetsPreviewProps> = ({ assetUrls }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState('');

  const openModal = (url: string) => {
    setActiveImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-4 sm:flex-row">
      {assetUrls.map((assetUrl, index) => (
        <div key={index} className="relative border-dashed border-2 border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl aspect-w-1 aspect-h-1 w-full h-[260px] sm:w-[30%] max-w-xs overflow-hidden">
          {assetUrl ? (
            <div onClick={() => openModal(assetUrl)}>
              <Image 
                src={assetUrl} 
                alt={`Asset ${index}`} 
                layout="fill" 
                objectFit="cover" 
                style={{ cursor: 'pointer' }} 
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={true}
                placeholder="blur"
                blurDataURL="/low-res-placeholder.jpg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Your Illustration
            </div>
          )}
        </div>
      ))}
      {modalOpen && <Modal src={activeImageUrl} onClose={closeModal} />}
    </div>
  );
};

export default AssetsPreview;
