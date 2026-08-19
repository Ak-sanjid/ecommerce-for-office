import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  CartLine,
  HomepageRow,
  Lang,
  NavItem,
  User,
} from "../types";
import { defaultHomeRows, defaultPromo, SAMPLE_LIMIT, SAMPLE_THRESHOLD } from "../data/config";
import { defaultNav } from "../data/nav";
import { quickAccessDefault } from "../data/config";
import { getProduct, products } from "../data/products";
import { track } from "../lib/analytics";

const LS = "kanti-store-v1";

type QuickItem = (typeof quickAccessDefault)[number];

interface Persisted {
  lang: Lang;
  user: User | null;
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recently: string[];
  samples: string[];
  alerts: string[];
  nav: NavItem[];
  rows: HomepageRow[];
  quick: QuickItem[];
}

function load(): Partial<Persisted> {
  try {
    const raw = localStorage.getItem(LS);
    return raw ? (JSON.parse(raw) as Partial<Persisted>) : {};
  } catch {
    return {};
  }
}

interface StoreValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  cart: CartLine[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  wishlist: string[];
  toggleWish: (id: string) => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  recently: string[];
  viewProduct: (id: string) => void;
  samples: string[];
  toggleSample: (id: string) => void;
  canPickSamples: boolean;
  alerts: string[];
  notifyRestock: (id: string) => void;
  nav: NavItem[];
  setNav: (n: NavItem[]) => void;
  rows: HomepageRow[];
  quick: QuickItem[];
  promo: typeof defaultPromo;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  quizOpen: boolean;
  setQuizOpen: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  toast: string | null;
  flash: (msg: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => load(), []);
  const [lang, setLangState] = useState<Lang>(initial.lang ?? "en");
  const [user, setUser] = useState<User | null>(initial.user ?? null);
  const [cart, setCart] = useState<CartLine[]>(initial.cart ?? []);
  const [wishlist, setWishlist] = useState<string[]>(initial.wishlist ?? []);
  const [compare, setCompare] = useState<string[]>(initial.compare ?? []);
  const [recently, setRecently] = useState<string[]>(initial.recently ?? []);
  const [samples, setSamples] = useState<string[]>(initial.samples ?? []);
  const [alerts, setAlerts] = useState<string[]>(initial.alerts ?? []);
  const [nav, setNav] = useState<NavItem[]>(initial.nav ?? defaultNav);
  const [rows] = useState<HomepageRow[]>(initial.rows ?? defaultHomeRows);
  const [quick] = useState<QuickItem[]>(initial.quick ?? quickAccessDefault);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const data: Persisted = {
      lang,
      user,
      cart,
      wishlist,
      compare,
      recently,
      samples,
      alerts,
      nav,
      rows,
      quick,
    };
    localStorage.setItem(LS, JSON.stringify(data));
  }, [lang, user, cart, wishlist, compare, recently, samples, alerts, nav, rows, quick]);

  useEffect(() => {
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
  }, [lang]);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    track("language_toggle", { lang: l });
  }, []);

  const login = useCallback((u: User) => {
    setUser(u);
    setAccountOpen(false);
    track("login", { method: "unified" });
    flash(lang === "bn" ? `স্বাগতম, ${u.name}` : `Welcome, ${u.name}`);
  }, [flash, lang]);

  const logout = useCallback(() => {
    setUser(null);
    track("logout");
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const product = getProduct(id);
      if (!product?.inStock) return;
      setCart((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { id, qty }];
      });
      track("add_to_cart", { id, value: product.price });
      setCartOpen(true);
    },
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setSamples([]);
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      track("wishlist_toggle", { id, on: !prev.includes(id) });
      return next;
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }, []);

  const viewProduct = useCallback((id: string) => {
    setRecently((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12));
  }, []);

  const toggleSample = useCallback((id: string) => {
    setSamples((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= SAMPLE_LIMIT) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }, []);

  const notifyRestock = useCallback(
    (id: string) => {
      setAlerts((prev) => (prev.includes(id) ? prev : [...prev, id]));
      track("restock_alert", { id });
      flash(lang === "bn" ? "স্টক এলে হোয়াটসঅ্যাপে জানাব" : "We will WhatsApp you when it returns");
    },
    [flash, lang],
  );

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartSubtotal = cart.reduce((n, l) => {
    const p = products.find((x) => x.id === l.id);
    return n + (p ? p.price * l.qty : 0);
  }, 0);
  const canPickSamples = cartSubtotal >= SAMPLE_THRESHOLD;

  useEffect(() => {
    if (!canPickSamples && samples.length) setSamples([]);
  }, [canPickSamples, samples.length]);

  const value: StoreValue = {
    lang,
    setLang,
    user,
    login,
    logout,
    cart,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    wishlist,
    toggleWish,
    compare,
    toggleCompare,
    recently,
    viewProduct,
    samples,
    toggleSample,
    canPickSamples,
    alerts,
    notifyRestock,
    nav,
    setNav,
    rows,
    quick,
    promo: defaultPromo,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    accountOpen,
    setAccountOpen,
    mobileOpen,
    setMobileOpen,
    quizOpen,
    setQuizOpen,
    chatOpen,
    setChatOpen,
    toast,
    flash,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
