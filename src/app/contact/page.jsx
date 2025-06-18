import ContactForm from "@/components/contactForm";
import ContactHero from "@/components/contactHero";
import ContactInfo from "@/components/contactInfo";
import FAQs from "@/components/FAQs";

const page = () => {
  return (
    <div>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <FAQs />
    </div>
  );
};

export default page;
