import { FiMail } from "react-icons/fi";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT_DATA } from "./contact_data";

export const ctaLinks = [
  {
    label: "Escribirnos",
    href: `mailto:${CONTACT_DATA.EMAIL_ADDRESS}`,
    icon: FiMail,
    variant: "solid" as const,
  },
  {
    label: "WhatsApp",
    href: CONTACT_DATA.WHATSAPP_LINK(
      "Hola, quiero saber más sobre sus servicios.",
    ),
    icon: FaWhatsapp,
    variant: "outline" as const,
  },
  {
    label: "Instagram",
    href: CONTACT_DATA.INSTAGRAM_LINK,
    icon: BsInstagram,
    variant: "outline" as const,
  },
  {
    label: "TikTok",
    href: CONTACT_DATA.TIKTOK_LINK,
    icon: BsTiktok,
    variant: "outline" as const,
  },
  {
    label: "Facebook",
    href: CONTACT_DATA.FACEBOOK_LINK,
    icon: BsFacebook,
    variant: "outline" as const,
  },
] as const;
