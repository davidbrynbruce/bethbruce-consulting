import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg font-semibold">
            Beth Bruce
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
            <Link to="/brief" className="hover:text-foreground">
              The Brief
            </Link>
            <a href="/#advisory" className="hover:text-foreground">
              Advisory
            </a>
            <a href="/#about" className="hover:text-foreground">
              About
            </a>
            <a
              href="/#contact"
              className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
          <Link
            to="/brief"
            className="text-sm font-medium text-muted-foreground hover:text-foreground sm:hidden"
          >
            The Brief
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Beth Bruce · Commerce Growth Advisory
        </span>
        <a
          href="https://www.linkedin.com/in/bethmbruce"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
}

export default Layout;
