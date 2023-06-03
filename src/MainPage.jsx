// eslint-disable-next-line react/prop-types
const MainPage = ({ onClick }) => {
  return (
    <div className="h-screen w-full grid grid-cols-2 items-center p-40 border-2 border-red-500">
      <div className="w-3/4">
        <h1 className="font-bold text-4xl pb-8">Real-time sign language<br/> translator with AI</h1>
        <p className="text-xl text-[#5F6368] pb-8">Sign language to text Speech to text Video communicationSign language to text Speech to text Video communicationSign language to text Speech to text Video communication</p>
        <button className="bg-[#1B73E9] text-white px-14 py-3 rounded-md" onClick={onClick}>Try it now</button>
      </div>
      <div>World</div>
    </div>
  );
};

export default MainPage;
