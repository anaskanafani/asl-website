// eslint-disable-next-line react/prop-types
const MainPage = ({ onClick }) => {
  return (
    <div className="h-screen w-full grid grid-cols-2 items-center pl-40">
      <div className="w-3/4">
        <h1 className="font-bold text-4xl pb-8">
          Real-time sign language
          <br /> translator with AI
        </h1>
        <p className="text-xl text-[#5F6368] pb-8">
          Bridging the Communication Gap by empowering Deaf Communities with
          Real-Time AI Sign Language Translation Harnessing the Power of
          Artificial Intelligence to Facilitate Seamless Interactions and
          Inclusive Communication
        </p>
        <button
          className="bg-[#1B73E9] text-white px-14 py-3 rounded-md"
          onClick={onClick}
        >
          Try it now
        </button>
      </div>
      <div className="flex justify-center">
        <img
          className="absolute bottom-0 right-0 h-[90%]"
          src="https://static.tildacdn.com/tild3063-3566-4335-b632-323035633937/SLAIT_in_your_hand.jpg"
          alt="bg image"
        />
      </div>
    </div>
  );
};

export default MainPage;
