const refresh = ({ refreshPage }) => {
  
  return (
    <button onClick={()=>{refreshPage()}} className="fixed bottom-0 right-0 m-10 p-5 rounded-full shadow-lg border-2 border-black shadow-black bg-white text-black font-bold  hover:rounded-xl">
      Refresh
    </button>
  );
};

export default refresh;
