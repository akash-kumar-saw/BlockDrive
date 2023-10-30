const refresh = ({ refreshPage, displayRefresh, isDarkMode }) => {
  
  return (
    displayRefresh && 
    <button onClick={()=>{refreshPage()}} className={`fixed bottom-0 right-0 m-10 p-5 rounded-full shadow-lg border-2 border-black shadow-black text-black font-bold  hover:rounded-xl ${isDarkMode ? 'bg-darkSecondary':'bg-secondary'}`}>
      Refresh
    </button>
  );
};

export default refresh;
