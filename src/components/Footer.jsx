import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NAV_LINKS, SITE } from "@/lib/site";

const linkClass = "link-focus text-slate-400 hover:text-indigo-300 transition-colors";

const socials = [
  { href: SITE.social.github, label: "GitHub", Icon: FaGithub },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: SITE.social.x, label: "X (Twitter)", Icon: FaXTwitter },
].filter((s) => s.href);

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-6 mt-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link
              href="/"
              className="link-focus text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text tracking-tighter"
            >
              {SITE.name}
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">{SITE.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {SITE.contactEmail && (
                <li>
                  <a href={`mailto:${SITE.contactEmail}`} className={linkClass}>
                    {SITE.contactEmail}
                  </a>
                </li>
              )}
              <li>{SITE.location}</li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Follow</h3>
            <ul className="space-y-2 text-sm">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-focus inline-flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    <Icon aria-hidden="true" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
