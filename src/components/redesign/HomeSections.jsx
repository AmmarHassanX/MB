import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "next/config";
import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaStar,
  FaSmoking,
  FaCloudMeatball,
  FaGlassMartiniAlt,
  FaPumpSoap,
  FaFire,
  FaTshirt,
  FaCannabis,
  FaBolt,
} from "react-icons/fa";
import {
  MdOutlineLocalDrink,
  MdOutlineFastfood,
  MdOutlineRestaurant,
  MdOutlineCategory,
  MdOutlineHealthAndSafety,
  MdOutlineCleaningServices,
  MdOutlinePhoneIphone,
  MdOutlineInventory2,
} from "react-icons/md";
import { TbCar } from "react-icons/tb";

import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import CommonProductCard from "../productCard/productCard";
import { setAlert } from "../../AsyncFunctions/alert";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const Hero = ({ businessId }) => {
  const { data: banner } = useDatafetcher(
    `/home/sliderImages?sliderType=banner-1&businessTypeId=${businessId || 1}`,
    true
  );
  const { data: stores } = useDatafetcher("/store", true);
  const store = stores?.find((s) => s.masterStore) || stores?.[0];

  const media = banner?.sliderImageList?.[0];
  const isVideo = media?.imageUrl?.toLowerCase().endsWith(".mp4");

  return (
    <section className="rd-hero">
      {media && (
        <div className="rd-hero-media">
          {isVideo ? (
            <video src={media.imageUrl} autoPlay muted loop playsInline />
          ) : (
            <img src={media.imageUrl} alt="MB Wholesale banner" />
          )}
        </div>
      )}
      <div className="rd-wrap">
        <div className="rd-hero-inner">
          <span className="rd-hero-pill">
            Wholesale · Cash & Carry · 21+
          </span>
          <h1>
            Stock your store with <em>wholesale prices</em> that move
          </h1>
          <p>
            {store?.description || "MB WHOLESALE LLC"} — your one-stop
            distributor for vape, beverages, snacks, automotive and restaurant
            supplies. Bulk pricing, fast fulfillment, and new arrivals every
            week.
          </p>
          <div className="rd-hero-ctas">
            <Link href="/products/vape-products/6">
              <a className="rd-btn primary">
                Shop Best Sellers <FiArrowRight />
              </a>
            </Link>
            <Link href="/new-arrival">
              <a className="rd-btn ghost">Browse New Arrivals</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Features strip                                                     */
/* ------------------------------------------------------------------ */
const FEATURES = [
  { icon: <FiTruck size={22} />, title: "Fast Fulfillment", text: "Quick turnaround on bulk orders" },
  { icon: <FiShield size={22} />, title: "Verified Wholesale", text: "Licensed distributor you can trust" },
  { icon: <FiHeadphones size={22} />, title: "Dedicated Support", text: "Real people, ready to help" },
  { icon: <FiRefreshCw size={22} />, title: "Easy Reordering", text: "Reorder your staples in seconds" },
];

export const FeaturesStrip = () => (
  <section className="rd-features">
    <div className="rd-wrap rd-features-row">
      {FEATURES.map((f) => (
        <div className="rd-feature" key={f.title}>
          <span className="rd-feature-icon">{f.icon}</span>
          <div>
            <b>{f.title}</b>
            <span>{f.text}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Category tiles                                                     */
/* ------------------------------------------------------------------ */
const catIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("vape")) return <FaCloudMeatball size={24} />;
  if (n.includes("tobacco") || n.includes("smoking")) return <FaSmoking size={24} />;
  if (n.includes("glass")) return <FaGlassMartiniAlt size={22} />;
  if (n.includes("bever") || n.includes("drink")) return <MdOutlineLocalDrink size={24} />;
  if (n.includes("snack") || n.includes("candy")) return <MdOutlineFastfood size={24} />;
  if (n.includes("restaurant") || n.includes("food service")) return <MdOutlineRestaurant size={24} />;
  if (n.includes("auto") || n.includes("car")) return <TbCar size={24} />;
  if (n.includes("beauty") || n.includes("personal")) return <FaPumpSoap size={22} />;
  if (n.includes("butane") || n.includes("torch") || n.includes("lighter")) return <FaFire size={22} />;
  if (n.includes("apparel") || n.includes("cloth")) return <FaTshirt size={22} />;
  if (n.includes("delta")) return <FaCannabis size={22} />;
  if (n.includes("health") || n.includes("safety")) return <MdOutlineHealthAndSafety size={24} />;
  if (n.includes("household")) return <MdOutlineCleaningServices size={24} />;
  if (n.includes("phone") || n.includes("tech")) return <MdOutlinePhoneIphone size={24} />;
  if (n.includes("energy") || n.includes("wellness")) return <FaBolt size={22} />;
  if (n.includes("inventory") || n.includes("suppl")) return <MdOutlineInventory2 size={24} />;
  return <MdOutlineCategory size={24} />;
};

export const CategoryTiles = ({ businessId }) => {
  const { data: navData } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    true
  );
  const cats = (navData || []).filter((c) => !c.deleted);
  if (!cats.length) return null;

  return (
    <section className="rd-categories">
      <div className="rd-wrap">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Departments</span>
            <h2 className="rd-h2">Shop by category</h2>
          </div>
        </div>
        <div className="rd-cat-grid">
          {cats.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.alias}/${cat.id}`}
            >
              <a className="rd-cat-tile">
                <span className="rd-cat-arrow">
                  <FiArrowRight size={16} />
                </span>
                <span className="rd-cat-icon">{catIcon(cat.name)}</span>
                <b>{cat.name}</b>
                <span>
                  {cat.subCategories?.length
                    ? `${cat.subCategories.length} subcategor${cat.subCategories.length > 1 ? "ies" : "y"}`
                    : "Shop now"}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Product rail (live ERP product tags)                               */
/* ------------------------------------------------------------------ */
const Rail = ({ tag, businessId }) => {
  const { data: products } = useDatafetcher(
    `/home/product/tagId/${tag?.id}?page=0&size=10&businessTypeId=${businessId}&storeId=2`,
    tag?.id,
    { stateId: true }
  );
  if (!products?.content?.length) return null;

  const isNew = tag?.name?.toLowerCase().includes("new product");

  return (
    <div className="rd-wrap">
      <div className="rd-section-head">
        <div>
          <span className="rd-eyebrow">{isNew ? "Just landed" : "Top sellers"}</span>
          <h2 className="rd-h2">{tag?.name}</h2>
        </div>
      </div>
      <div className="rd-rail-track">
        {products.content.map((product, i) => (
          <CommonProductCard
            key={product?.productId || i}
            isNew={isNew}
            product={product}
            tag={tag?.name}
          />
        ))}
      </div>
    </div>
  );
};

export const ProductRails = ({ businessId }) => {
  const { data: tags } = useDatafetcher(`/home/productTagList`, true);
  if (!tags?.length) return null;
  return (
    <section className="rd-rail">
      {tags.map((tag, i) => (
        <Rail key={tag?.id || i} tag={tag} businessId={businessId} />
      ))}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Promo grid (top-products banners from the ERP)                     */
/* ------------------------------------------------------------------ */
/* Convert ERP redirect URLs (often pointing at older deployments)
   into local paths so visitors stay on this site. */
const localizePath = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch (e) {
    return url.startsWith("/") ? url : null;
  }
};

export const PromoGrid = ({ businessId }) => {
  const { data } = useDatafetcher(
    `/home/sliderImages?sliderType=top-products&businessTypeId=${businessId || 1}`,
    true
  );
  const promos = data?.sliderImageList || [];
  if (!promos.length) return null;

  return (
    <section className="rd-promos">
      <div className="rd-wrap">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Handpicked for you</span>
            <h2 className="rd-h2">Recommended this week</h2>
          </div>
        </div>
        <div className="rd-promo-grid">
          {promos.slice(0, 6).map((promo) => {
            const href = localizePath(promo.redirectPath);
            const card = (
              <>
                <img src={promo.imageUrl} alt="Promotion" loading="lazy" />
              </>
            );
            return href ? (
              <Link key={promo.id} href={href}>
                <a className="rd-promo-card">{card}</a>
              </Link>
            ) : (
              <div key={promo.id} className="rd-promo-card">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
const TESTIMONIALS = [
  {
    name: "Dino's Smoke Shop",
    role: "Retail partner · Indianapolis",
    text: "MB Wholesale keeps our shelves stocked with the brands our customers actually ask for. Pricing is consistently the best we find, and orders arrive fast.",
  },
  {
    name: "QuickStop Market",
    role: "Convenience store owner",
    text: "Ordering is straightforward, the catalog is huge, and their team picks up the phone when we need something. Reordering weekly staples takes us minutes.",
  },
  {
    name: "Midway Gas & Go",
    role: "Gas station operator",
    text: "From vapes to beverages to car accessories, one distributor covers almost our whole store. Reliable stock and fair case pricing every single time.",
  },
];

export const Testimonials = () => (
  <section className="rd-testimonials">
    <div className="rd-wrap">
      <div className="rd-section-head centered">
        <div>
          <span className="rd-eyebrow">What partners say</span>
          <h2 className="rd-h2">Trusted by retailers across the region</h2>
        </div>
      </div>
      <div className="rd-t-grid">
        {TESTIMONIALS.map((t) => (
          <div className="rd-t-card" key={t.name}>
            <div className="rd-t-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={15} />
              ))}
            </div>
            <p>{t.text}</p>
            <div className="rd-t-who">
              <span className="rd-t-avatar">{t.name.charAt(0)}</span>
              <div>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Newsletter (posts to the existing ERP contact endpoint)            */
/* ------------------------------------------------------------------ */
export const Newsletter = () => {
  const { publicRuntimeConfig } = getConfig();
  const { SERVICE_API_BASE_URL } = publicRuntimeConfig;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [sending, setSending] = useState(false);

  const onSubmit = async (formData) => {
    if (sending) return;
    setSending(true);
    try {
      await axios.post(`${SERVICE_API_BASE_URL}/email/customer/contact-us`, {
        ...formData,
        message: "This is coming from SUBSCRIBE form.",
      });
      setAlert("success", "Subscribe mail sent successfully")(dispatch);
      reset({ email: "" });
    } catch (e) {
      setAlert("error", "Error in sending mail")(dispatch);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rd-newsletter">
      <div className="rd-wrap">
        <div className="rd-news-box">
          <div>
            <h3>Get weekly deals & new arrival alerts</h3>
            <p>
              Join the MB Wholesale list — fresh stock, case deals and
              closeouts, straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              required
              placeholder="Your business email"
              {...register("email", { required: true })}
            />
            <button type="submit" disabled={sending}>
              {sending ? "Sending…" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
