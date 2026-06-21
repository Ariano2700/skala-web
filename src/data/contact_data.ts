const WHATSAPP_NUMBER = "+51959739831";
const EMAIL_ADDRESS = "skalaagenciayproductora@gmail.com";
const INSTAGRAM_LINK = "https://www.instagram.com/skalaagenciaproductora/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61587277293325";
const TIKTOK_LINK = "https://www.tiktok.com/@skalaagenciaproductora";
const WHATSAPP_LINK = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
export const CONTACT_DATA = {
  WHATSAPP_NUMBER,
  WHATSAPP_LINK,
  EMAIL_ADDRESS,
  INSTAGRAM_LINK,
  FACEBOOK_LINK,
  TIKTOK_LINK,
};
