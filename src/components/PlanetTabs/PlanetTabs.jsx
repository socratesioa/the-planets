import { useState } from "react";

function PlanetTabs({ planet }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="planet__page-inner">
        <div className="planet__tabs-container">
            <div className={`planet__tabs-buttons planet__tabs-buttons--${planet.slug}`}>
    <button
      className={activeTab === "overview" ? "active" : ""}
      onClick={() => setActiveTab("overview")}
    >
      Overview
    </button>

    <button
      className={activeTab === "structure" ? "active" : ""}
      onClick={() => setActiveTab("structure")}
    >
      Structure
    </button>

    <button
      className={activeTab === "geology" ? "active" : ""}
      onClick={() => setActiveTab("geology")}
    >
      Surface
    </button>
  </div>
        </div>
  

<div className="planet__page-details">
    <div className="planet__page-text">
        <h1 className="planet__page-title">{planet.name}</h1>
        <p>{planet.content[activeTab]}</p>
    </div>
    <span>
      Source: <a
      href={planet.content[`${activeTab}Source`]}
      target="_blank"
      rel="noopener noreferrer"
    >Wikipedia</a>  
    </span>
  </div>
    

    <div className={`planet__image-wrapper planet__image-wrapper--${planet.slug}`}>
      {activeTab === "geology" ? (
        <>
          <img src={planet.images.overview} alt={planet.name} />
          <img
            className="planet__geology-overlay"
            src={planet.images.geology}
            alt={`${planet.name} surface geology`}
          />
        </>
      ) : (
        <img src={planet.images[activeTab]} alt={planet.name} />
      )}
  </div>
</div>
  );
}

export default PlanetTabs;