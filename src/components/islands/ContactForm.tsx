import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { CalendarCheck, Check } from "lucide-react";

// Set PUBLIC_FORM_ENDPOINT in .env (for example a Formspree URL).
// If it is empty, the form runs in demo mode and sends nothing.
const ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;

const reasons = [
  "Medical Weight Loss",
  "Family Medicine",
  "Pediatrics",
  "Diabetes Management",
  "Women's Health",
  "Physical Exam",
  "Immunizations",
  "Hypertension",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-brand-900/20 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-300/40 aria-[invalid=true]:border-red-700";
const label = "block font-heading text-sm font-medium text-brand-900";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot

    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (phone.length < 10) next.phone = "Please enter a phone number with area code.";
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "That email looks incomplete.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`#${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 900)); // demo mode
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const err = (k: string) => (errors[k] ? `${k}-err` : undefined);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Thank you!</h3>
            <p className="mt-3 max-w-xs text-muted">
              We got your request and will call you to confirm a time.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>Full name</label>
                <input id="name" name="name" type="text" autoComplete="name" required
                  aria-invalid={!!errors.name} aria-describedby={err("name")} className={field} placeholder="Jane Smith" />
                {errors.name && <p id="name-err" className="mt-1.5 text-sm text-red-700">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className={label}>Phone</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
                  aria-invalid={!!errors.phone} aria-describedby={err("phone")} className={field} placeholder="214-555-0123" />
                {errors.phone && <p id="phone-err" className="mt-1.5 text-sm text-red-700">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={label}>Email <span className="font-normal text-muted">(optional)</span></label>
              <input id="email" name="email" type="email" autoComplete="email"
                aria-invalid={!!errors.email} aria-describedby={err("email")} className={field} placeholder="you@example.com" />
              {errors.email && <p id="email-err" className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="reason" className={label}>Reason for visit</label>
                <select id="reason" name="reason" className={field} defaultValue="">
                  <option value="" disabled>Choose one</option>
                  {reasons.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="date" className={label}>Preferred day <span className="font-normal text-muted">(optional)</span></label>
                <input id="date" name="date" type="date" className={field} />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={label}>Message <span className="font-normal text-muted">(optional)</span></label>
              <textarea id="message" name="message" rows={4} className={field} placeholder="How can we help?" />
            </div>

            {/* honeypot: hidden from people */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <p className="text-xs text-muted">
              Please do not share private medical details here. We will call you to talk about them safely.
            </p>

            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
              {status === "sending" ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Request Appointment
                </>
              )}
            </button>

            <p aria-live="polite" className="text-sm text-red-700">
              {status === "error" && "Sorry, something went wrong. Please call us at 214-942-2377."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
