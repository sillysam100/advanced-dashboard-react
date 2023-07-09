import { useParams } from "react-router-dom";
import { IPage } from "../types/Page";
import Page from "../components/Page";
import { getPages } from "../api/page";
import { useEffect, useState } from "react";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { getSite } from "../api/site";

export default function SitePage() {
  const { id } = useParams<{ id: string }>();
  const [pages, setPages] = useState<IPage[]>([]);
  const [pageId, setPageId] = useState<string>("");
  const { setLoading, setSiteName, setShowEditButton } =
    useAdvancedDashboardProvider();

  if (!id) {
    return <div>Invalid site id</div>;
  }

  useEffect(() => {
    if (pages.length > 0) {
      setShowEditButton(true);
    }
  }, [pages]);

  useEffect(() => {
    setLoading(true);
    getPages(id).then((pages) => {
      setPages(pages);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    getSite(id).then((site) => {
      setSiteName(site.name);
    });
  }, [id]);

  useEffect(() => {
    if (pages.length > 0) {
      setPageId(pages[0]._id || "");
    }
  }, [pages]);

  const currentPage = pages.find((page) => page._id === pageId);

  return (
    <div>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          {pages.map((page) => (
            <div
              key={page._id}
              className={`tab tab-bordered ${
                pageId === page._id ? "tab-active" : ""
              }`}
              onClick={() => setPageId(page._id || "")}
            >
              {page.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        {pageId.length > 1 && currentPage && (
          <Page pageId={pageId} page={currentPage} />
        )}
      </div>
    </div>
  );
}
