import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISite } from "../../types/iiicontrol/Site";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddSiteModal from "./AddSiteModal";

interface SitesProps {
  sites: ISite[];
  reloadTrigger: () => {};
}

export default function Sites({ sites, reloadTrigger }: SitesProps) {
  return (
    <div className="m-3 grid grid-cols-6 gap-3">
      {sites.map((site) => (
        <div
          key={site._id}
          className="card bordered bg-neutral-content col-span-2"
        >
          <div className="card-body">
            <h2 className="card-title ">{site.name}</h2>
            <Link
              to={`/iiicontrol/site/${site._id}`}
              className="btn btn-primary"
            >
              View
            </Link>
          </div>
        </div>
      ))}
      <AddSiteModal reloadTrigger={reloadTrigger} />
    </div>
  );
}
