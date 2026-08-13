import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { SpecTag } from "@/components/ui/SpecTag";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { publicFetch } from "@/lib/api";

const PROJECT_TYPES = [
  "Cancel de baño",
  "Ventanas / Puertas",
  "Fachada",
  "Mueble a medida",
  "Otro",
];

type Status = "idle" | "sending" | "sent";

export function Contacto() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      await publicFetch("/public/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("nombre"),
          phone: form.get("telefono"),
          email: form.get("correo") || "sin-correo@elcercho.mx",
          projectType,
          message: form.get("mensaje") || "",
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section id="contacto" className="relative bg-graphite-950 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info de contacto */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <SpecTag>Contacto</SpecTag>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
            Cuéntanos tu proyecto,
            <br /> te cotizamos en 24h
          </h2>
          <p className="mt-4 max-w-md font-body text-steel-300">
            Visita técnica sin costo dentro del área metropolitana. Fuera de
            zona, cotización preliminar por fotos y medidas.
          </p>

          <ul className="mt-9 space-y-5">
            <ContactRow icon={<Phone size={18} />} text="+52 271 700 76 37" />
            <ContactRow icon={<Mail size={18} />} text="vialum-cercho@hotmail.com" />
            <ContactRow icon={<MapPin size={18} />} text="Córdoba, Santa Cruz Buena Vista, Avenida 5 de Mayo" />
          </ul>
        </motion.div>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-3xl p-8"
        >
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <CheckCircle2 className="text-glass-400" size={40} />
              <p className="mt-4 font-display text-lg font-semibold text-aluminum-100">
                Solicitud enviada
              </p>
              <p className="mt-2 font-body text-sm text-steel-300">
                Un asesor te contactará dentro de las próximas 24 horas.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Nombre completo" htmlFor="nombre" className="sm:col-span-2">
                <input
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  className="input-base"
                />
              </Field>

              <Field label="Teléfono" htmlFor="telefono">
                <input
                  id="telefono"
                  name="telefono"
                  required
                  type="tel"
                  placeholder="55 0000 0000"
                  className="input-base"
                />
              </Field>

              <Field label="Correo" htmlFor="correo">
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@mail.com"
                  className="input-base"
                />
              </Field>

              <Field label="Tipo de proyecto" htmlFor="tipo" className="sm:col-span-2">
                <select
                  id="tipo"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="input-base appearance-none"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-graphite-900">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Mensaje" htmlFor="mensaje" className="sm:col-span-2">
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Medidas aproximadas, ubicación, referencias..."
                  className="input-base resize-none"
                />
              </Field>

              <div className="sm:col-span-2">
                <ShimmerButton type="submit" className="w-full justify-center">
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Solicitar cotización"
                  )}
                </ShimmerButton>
              </div>
            </div>
          )}
        </motion.form>
      </div>

      {/* Utilidades locales de input (Tailwind v4 @apply-free) */}
      <style>{`
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(255 255 255 / 0.1);
          background: rgb(255 255 255 / 0.03);
          padding: 0.7rem 1rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-aluminum-100);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input-base::placeholder { color: var(--color-steel-600); }
        .input-base:focus { border-color: var(--color-glass-400); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-xs text-steel-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 font-body text-sm text-steel-300">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-glass-400">
        {icon}
      </span>
      {text}
    </li>
  );
}
