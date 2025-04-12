
export const StatusBar = () => {
  return (
    <div className="bg-gray-50 px-5 py-2 flex justify-between items-center">
      <div className="font-bold text-sm">00.00</div>
      <div className="flex items-center space-x-2">
        <div className="flex h-3.5 items-center">
          <div className="h-3.5 w-0.5 bg-gray-800 mr-0.5"></div>
          <div className="h-2.5 w-0.5 bg-gray-800 mr-0.5"></div>
          <div className="h-1.5 w-0.5 bg-gray-800 mr-0.5"></div>
          <div className="h-1 w-0.5 bg-gray-800"></div>
        </div>
        <span className="font-bold text-xs">4G</span>
        <div className="h-4 w-6 border-2 border-gray-900 rounded-sm relative flex items-center p-0.5">
          <div className="h-full w-3/4 bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};
