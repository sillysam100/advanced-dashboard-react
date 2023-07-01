import { Site } from "../types/Site"
import { Link } from "react-router-dom";

interface SitesProps {
    sites: Site[];
}

export default function Sites({ sites }: SitesProps) {
    return (
        <div className="m-3 grid grid-cols-3">
            {sites.map((site) => (
                <div key={site._id} className="card bordered m-3">
                    <div className="card-body">
                        <h2 className="card-title text-black">{site.name}</h2>
                        <p className="card-subtitle text-gray-500">{site.registers}</p>
                        <Link to={`/site/${site._id}`} className="btn btn-neutral">View</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}