import { ISite } from "../types/Site";
import { Link } from "react-router-dom";

interface SitesProps {
  sites: ISite[];
}

export default function Sites({ sites }: SitesProps) {
  return (
    <div className="m-3 grid grid-cols-3 gap-3">
      {sites.map((site) => (
        <div key={site._id} className="card bordered bg-neutral-content">
          <div className="card-body">
            <h2 className="card-title ">{site.name}</h2>
            <Link
              to={`/iii-control/site/${site._id}`}
              className="btn btn-primary"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
