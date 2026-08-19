import type { Brand } from "@/types";

export const brands: Brand[] = [
  { id: "anua", name: "Anua", logo: "/images/products/toner.jpg", country: "Korea", isOfficial: true, color: "#2B2B2B", tagline: "Heartleaf calm, pore clarity.", taglineBn: "হার্টলিফ শান্তি, পোর ক্ল্যারিটি।" },
  { id: "axis-y", name: "AXIS-Y", logo: "/images/products/serum-snail.jpg", country: "Korea", isOfficial: true, color: "#2B2B2B", tagline: "Dark-spot science, daily glow.", taglineBn: "ডার্ক স্পট সায়েন্স, প্রতিদিনের গ্লো।" },
  { id: "joseon", name: "Beauty of Joseon", logo: "/images/products/sunscreen.jpg", country: "Korea", isOfficial: true, color: "#4A3B28", tagline: "Hanbang ritual, modern SPF.", taglineBn: "হানবাং রীতি, আধুনিক এসপিএফ।" },
  { id: "cerave", name: "CeraVe", logo: "/images/products/cleanser.jpg", country: "USA", isOfficial: true, color: "#1A3A5C", tagline: "Ceramides the skin already knows.", taglineBn: "সেরামাইড যা ত্বক চেনে।" },
  { id: "cetaphil", name: "Cetaphil", logo: "/images/products/moisturizer.jpg", country: "USA", isOfficial: false, color: "#2B2B2B", tagline: "Gentle enough for the whole house.", taglineBn: "পুরো পরিবারের জন্য কোমল।" },
  { id: "cosrx", name: "COSRX", logo: "/images/products/serum-snail.jpg", country: "Korea", isOfficial: true, color: "#2B2B2B", tagline: "Snail, acids, no fuss.", taglineBn: "স্নেইল, অ্যাসিড, বাড়তি কথা নেই।" },
  { id: "dr-althea", name: "Dr. Althea", logo: "/images/products/moisturizer.jpg", country: "Korea", isOfficial: false, color: "#2B2B2B", tagline: "Clinic textures, home ritual.", taglineBn: "ক্লিনিক টেক্সচার, ঘরের রুটিন।" },
  { id: "fino", name: "Shiseido Fino", logo: "/images/products/hair-mask.jpg", country: "Japan", isOfficial: true, color: "#1A1A1A", tagline: "The hair mask everyone borrows.", taglineBn: "যে হেয়ার মাস্ক সবাই ধার চায়।" },
  { id: "glow-edit", name: "GLOW Edit", logo: "/images/hero-still.jpg", country: "Bangladesh", isOfficial: true, color: "#C9A45C", tagline: "Routines we will put our name on.", taglineBn: "যে রুটিনে আমরা নাম দিই।" },
  { id: "glow-homme", name: "GLOW Homme", logo: "/images/hero-men.jpg", country: "Bangladesh", isOfficial: true, color: "#6B7B80", tagline: "Grooming, not leftover pink.", taglineBn: "গ্রুমিং, বাদপড়া গোলাপি নয়।" },
  { id: "hada-labo", name: "Hada Labo", logo: "/images/products/toner.jpg", country: "Japan", isOfficial: true, color: "#1A1A1A", tagline: "Hyaluronic, layered the Japanese way.", taglineBn: "হায়ালুরনিক, জাপানি স্টাইলে।" },
  { id: "loreal", name: "L'Oréal Paris", logo: "/images/products/hair-mask.jpg", country: "France", isOfficial: false, color: "#1A1A1A", tagline: "Hair that holds a day.", taglineBn: "চুল যা সারাদিন থাকে।" },
  { id: "lrp", name: "La Roche-Posay", logo: "/images/products/moisturizer.jpg", country: "France", isOfficial: true, color: "#1A3A5C", tagline: "Thermal water, dermatologist trust.", taglineBn: "থার্মাল ওয়াটার, ডার্মাটোলজিস্ট বিশ্বাস।" },
  { id: "maybelline", name: "Maybelline", logo: "/images/products/moisturizer.jpg", country: "USA", isOfficial: false, color: "#1A1A1A", tagline: "Colour that keeps up.", taglineBn: "রঙ যা তাল রাখে।" },
  { id: "melano-cc", name: "Rohto Melano CC", logo: "/images/products/serum-snail.jpg", country: "Japan", isOfficial: true, color: "#C45C26", tagline: "Vitamin C that means it.", taglineBn: "ভিটামিন সি যা সত্যি কাজ করে।" },
  { id: "mustela", name: "Mustela", logo: "/images/hero-mom.jpg", country: "France", isOfficial: true, color: "#4A7C59", tagline: "From first bath to first steps.", taglineBn: "প্রথম গোসল থেকে প্রথম পা।" },
  { id: "purito", name: "Purito", logo: "/images/products/moisturizer.jpg", country: "Korea", isOfficial: false, color: "#4A7C59", tagline: "Oat calm for monsoon skin.", taglineBn: "বর্ষার ত্বকের জন্য ওট শান্তি।" },
  { id: "rare-beauty", name: "Rare Beauty", logo: "/images/products/moisturizer.jpg", country: "USA", isOfficial: false, color: "#C49490", tagline: "A rosewood that sits correctly.", taglineBn: "রোজউড যা ঠিক বসে।" },
  { id: "senka", name: "Senka", logo: "/images/products/cleanser.jpg", country: "Japan", isOfficial: false, color: "#1A1A1A", tagline: "The famous whip of foam.", taglineBn: "সেই বিখ্যাত ফোম।" },
  { id: "skin1004", name: "SKIN1004", logo: "/images/products/toner.jpg", country: "Korea", isOfficial: true, color: "#2B2B2B", tagline: "Centella from Madagascar, bottled.", taglineBn: "মাদাগাস্কারের সেন্টেলা, বোতলে।" },
  { id: "the-ordinary", name: "The Ordinary", logo: "/images/products/serum-snail.jpg", country: "Canada", isOfficial: false, color: "#2B2B2B", tagline: "Actives, priced like actives.", taglineBn: "অ্যাকটিভ, অ্যাকটিভের দামে।" },
];

export const brandAlphabet = brands.reduce<Record<string, Brand[]>>((acc, b) => {
  const letter = b.name[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(b);
  return acc;
}, {});

export const brandLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
