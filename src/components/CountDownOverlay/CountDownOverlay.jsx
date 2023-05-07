export const CountDownOverlay = ({ countDown }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="text-white text-6xl font-bold">{countDown}</div>
      </div>
    );
  };
  