import type { Brand } from "../types";

export const brands: Brand[] = [
  { name: "Anua", slug: "anua", origin: "k-beauty", letter: "A", official: true, tagline: { en: "Heartleaf calm, pore clarity.", bn: "হার্টলিফ শান্তি, পোর ক্ল্যারিটি।" } },
  { name: "AXIS-Y", slug: "axis-y", origin: "k-beauty", letter: "A", official: true, tagline: { en: "Dark-spot science, daily glow.", bn: "ডার্ক স্পট সায়েন্স, প্রতিদিনের গ্লো।" } },
  { name: "Beauty of Joseon", slug: "beauty-of-joseon", origin: "k-beauty", letter: "B", official: true, tagline: { en: "Hanbang ritual, modern SPF.", bn: "হানবাং রীতি, আধুনিক এসপিএফ।" } },
  { name: "CeraVe", slug: "cerave", origin: "international", letter: "C", official: true, tagline: { en: "Ceramides the skin already knows.", bn: "সেরামাইড যা ত্বক চেনে।" } },
  { name: "Cetaphil", slug: "cetaphil", origin: "international", letter: "C", tagline: { en: "Gentle enough for the whole house.", bn: "পুরো পরিবারের জন্য কোমল।" } },
  { name: "COSRX", slug: "cosrx", origin: "k-beauty", letter: "C", official: true, tagline: { en: "Snail, acids, no fuss.", bn: "স্নেইল, অ্যাসিড, বাড়তি কথা নেই।" } },
  { name: "Dr. Althea", slug: "dr-althea", origin: "k-beauty", letter: "D", tagline: { en: "Clinic textures, home ritual.", bn: "ক্লিনিক টেক্সচার, ঘরের রুটিন।" } },
  { name: "Dove", slug: "dove", origin: "international", letter: "D", tagline: { en: "Softness you can feel.", bn: "কোমলতা যা ছুঁয়ে বোঝা যায়।" } },
  { name: "Fenty Beauty", slug: "fenty-beauty", origin: "international", letter: "F", tagline: { en: "Shades that actually exist.", bn: "শেড যা সত্যিই আছে।" } },
  { name: "Hada Labo", slug: "hada-labo", origin: "j-beauty", letter: "H", official: true, tagline: { en: "Hyaluronic, layered the Japanese way.", bn: "হায়ালুরনিক, জাপানি স্টাইলে স্তরে স্তরে।" } },
  { name: "Innisfree", slug: "innisfree", origin: "k-beauty", letter: "I", tagline: { en: "Jeju greens, daily light.", bn: "জেজুর সবুজ, হালকা প্রতিদিন।" } },
  { name: "La Roche-Posay", slug: "la-roche-posay", origin: "international", letter: "L", official: true, tagline: { en: "Thermal water, dermatologist trust.", bn: "থার্মাল ওয়াটার, ডার্মাটোলজিস্ট বিশ্বাস।" } },
  { name: "L'Oréal Paris", slug: "loreal-paris", origin: "international", letter: "L", tagline: { en: "Hair that holds a day.", bn: "চুল যা সারাদিন থাকে।" } },
  { name: "Maybelline", slug: "maybelline", origin: "international", letter: "M", tagline: { en: "Colour that keeps up.", bn: "রঙ যা তাল রাখে।" } },
  { name: "Mustela", slug: "mustela", origin: "international", letter: "M", official: true, tagline: { en: "From first bath to first steps.", bn: "প্রথম গোসল থেকে প্রথম পা।" } },
  { name: "Neutrogena", slug: "neutrogena", origin: "international", letter: "N", tagline: { en: "Hydro-boost, no greasy film.", bn: "হাইড্রো-বুস্ট, তেলতেলে নয়।" } },
  { name: "Purito", slug: "purito", origin: "k-beauty", letter: "P", tagline: { en: "Oat calm for monsoon skin.", bn: "বর্ষার ত্বকের জন্য ওট শান্তি।" } },
  { name: "Rohto Melano CC", slug: "melano-cc", origin: "j-beauty", letter: "R", official: true, tagline: { en: "Vitamin C that means it.", bn: "ভিটামিন সি যা সত্যি কাজ করে।" } },
  { name: "SKIN1004", slug: "skin1004", origin: "k-beauty", letter: "S", official: true, tagline: { en: "Centella from Madagascar, bottled.", bn: "মাদাগাস্কারের সেন্টেলা, বোতলে।" } },
  { name: "Senka", slug: "senka", origin: "j-beauty", letter: "S", tagline: { en: "The famous whip of foam.", bn: "সেই বিখ্যাত ফোম।" } },
  { name: "Shiseido Fino", slug: "fino", origin: "j-beauty", letter: "S", official: true, tagline: { en: "The hair mask everyone borrows.", bn: "যে হেয়ার মাস্ক সবাই ধার চায়।" } },
  { name: "SK-II", slug: "sk-ii", origin: "j-beauty", letter: "S", tagline: { en: "Pitera, if you are ready.", bn: "পিটেরা, যদি আপনি প্রস্তুত হন।" } },
  { name: "The Ordinary", slug: "the-ordinary", origin: "international", letter: "T", tagline: { en: "Actives, priced like actives.", bn: "অ্যাকটিভ, অ্যাকটিভের দামে।" } },
  { name: "Utena", slug: "utena", origin: "j-beauty", letter: "U", tagline: { en: "Simple balance, serious moisture.", bn: "সিম্পল ব্যালেন্স, গভীর আর্দ্রতা।" } },
];

export const brandLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
