import React from 'react';

export const Modal = ({ children, isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div style={{ width: 600 }} className="bg-gray-200 p-8 rounded-lg w-120 relative max-h-screen overflow-y-auto">
        <button onClick={closeModal} className="absolute top-2 left-2 text-gray-800">
          Close
        </button>
        <div className="flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};


// import React from 'react';

// export const Modal = ({ children, isOpen, closeModal }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-9"></div>
//       )}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10 ${
//           !isOpen ? 'hidden' : ''
//         }`}
//       >
//         <div className="bg-gray-200 p-8 rounded-lg flex justify-center w-full h-full relative">
//           {children}
//           <button
//             onClick={closeModal}
//             className="absolute top-4 left-4 text-gray-800"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
