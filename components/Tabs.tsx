import { AppContext } from "contexts";
import { useContext } from "react";

const tabs = [
  { name: "Product", current: 0 },
  { name: "Download", current: 1 },
];

const Tabs = ({ hasPurchased }) => {
  const { tabKey, setTabKey } = useContext(AppContext);

  if (!hasPurchased) {
    return null;
  }
  return (
    <div className="block">
      <div className="border-b border-gray-200">
        <nav
          className="flex justify-center -mb-px space-x-8 lg:justify-start lg:ml-16"
          aria-label="Tabs"
        >
          {tabs.map((tab, i) => (
            <div
              key={tab.name}
              onClick={() => setTabKey(i)}
              className={`${
                tab.current === tabKey
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 text-sm  font-semibold tracking-wide  cursor-pointer uppercase`}
            >
              {tab.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
