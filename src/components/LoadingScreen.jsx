import React, { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Loading moon */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-yellow-600 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">LOADING THE NIGHT...</h2>
        <div className="w-48 h-2 bg-black/50 rounded overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
