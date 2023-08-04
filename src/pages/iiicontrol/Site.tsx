import { useParams } from "react-router-dom";
import { IPage } from "../../types/iiicontrol/Page";
import Page from "../../components/iiicontrol/Page";
import { getPages } from "../../api/iiicontrol/page";
import { useEffect, useState } from "react";
import { getSite } from "../../api/iiicontrol/site";
import { useAdvancedDashboardProvider } from "../../context/AdvancedDashboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddPageModal from "../../components/iiicontrol/AddPageModal";

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

  const loadPages = async () => {
    setLoading(true);
    getPages(id).then((pages) => {
      setPages(pages);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadPages();
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

  const handleRefreshPage = () => {
    getPages(id).then((pages) => {
      setPages(pages);
    });
  };

  return (
    <div>
      <div className="mt-3 flex justify-center">
        <div className="tabs">
          {pages.map((page) => (
            <div
              key={page._id}
              className={`tab-bordered tab ${
                pageId === page._id ? "tab-active" : ""
              }`}
              onClick={() => setPageId(page._id || "")}
            >
              {page.name}
            </div>
          ))}
          <AddPageModal reloadTrigger={loadPages} siteId={id} />
        </div>
      </div>
      <div className="mt-3">
        {pageId.length > 1 && currentPage && (
          <Page
            pageId={pageId}
            page={currentPage}
            siteId={id}
            refreshPage={handleRefreshPage}
          />
        )}
      </div>
    </div>
  );
}
