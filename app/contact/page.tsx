import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact | Achás",
  description: "Get in touch regarding photography projects and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Contact
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
                Let's work together.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-black/60">
                Have a project, event, or creative idea in mind? Send an
                inquiry and provide a few details about what you're looking
                for.
              </p>

              <div className="mt-10 border-t border-black/10 pt-8">
                <p className="text-sm text-black/40">Email</p>
                <p className="mt-2 text-sm">
                  your-email@example.com
                </p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}