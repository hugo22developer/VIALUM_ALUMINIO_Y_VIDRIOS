import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { SectionLink } from "@/components/ui/SectionLink";
import logoCercho from '../../assets/image/logo_cercho.png';

const LINKS = [
  { label: "Nosotros", hash: "#nosotros" },
  { label: "Catálogo", hash: "#catalogo" },
  { label: "Blog", hash: "#blog" },
  { label: "Contacto", hash: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass-panel flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-[background,box-shadow] duration-300 ${
          scrolled ? "bg-graphite-950/70" : "bg-graphite-950/30"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark/>
          <span className="font-display text-sm font-semibold tracking-[0.14em] text-aluminum-100">
            EL&nbsp;<span className="text-glass-400">CERCHO</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.hash}>
              <SectionLink
                hash={link.hash}
                className="font-body text-sm text-steel-300 transition-colors hover:text-aluminum-100"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ShimmerButton to="/#contacto" className="!px-5 !py-2 text-xs">
            Cotizar
          </ShimmerButton>
        </div>

        <button
          aria-label="Abrir menú"
          className="text-aluminum-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-panel absolute left-4 right-4 top-[76px] flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {LINKS.map((link) => (
              <SectionLink
                key={link.hash}
                hash={link.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-body text-sm text-aluminum-100 hover:bg-white/5"
              >
                {link.label}
              </SectionLink>
            ))}
            <SectionLink
              hash="#contacto"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-amber-500 px-3 py-2.5 text-center font-display text-sm font-semibold text-graphite-950"
            >
              Cotizar
            </SectionLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LogoMark() {
  return (
    <img
      src={logoCercho}
      alt="Logo El Cercho"
      width={50}
      height={50}
      className="h-[50px] w-[50px] rounded-md object-contain"
      aria-hidden="true"
    />
  );
}
