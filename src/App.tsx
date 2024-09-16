import "./App.css";

function App() {
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        console.log("fhjsakfahaskhfadlkj");
        document.body.style.backgroundColor = "red";
        alert("Hello world");
      },
    });
  };

  return (
    <div>
      Hello world
      <div className="">
        <button onClick={onClick}>CLick me now</button>
      </div>
    </div>
  );
}

export default App;
