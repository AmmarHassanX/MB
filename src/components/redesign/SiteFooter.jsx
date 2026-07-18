import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import { links1, links2 } from "../footer/footerData";

const SiteFooter = ({ businessId }) => {
  const { data: stores } = useDatafetcher("/store", true);
  const { data: navData } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    true
  );
  const store = stores?.find((s) => s.masterStore) || stores?.[0];
  const cats = (navData || []).filter((c) => !c.deleted).slice(0, 6);

  return (
    <footer className="rd-footer">
      <div className="rd-wrap rd-footer-main">
        <div className="rd-footer-brand">
          {store?.logoUrl ? (
            <img src={store.logoUrl} alt="MB Wholesale" />
          ) : (
            <div className="rd-wordmark">
              MB<span>Wholesale</span>
            </div>
          )}
          <p>
            {store?.description || "MB WHOLESALE LLC"} — wholesale distributor
            for vape products, beverages, snacks, automotive accessories and
            restaurant supplies. Serving retailers with bulk pricing and fast
            fulfillment.
          </p>
          <div className="rd-socials">
            <a
              href="https://wa.me/13178039060"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={17} />
            </a>
            <a href="tel:+13178039060" aria-label="Call us">
              <FiPhoneCall size={15} />
            </a>
            <a href="mailto:sales@mbwholesalellc.com" aria-label="Email us">
              <MdOutlineMail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h5>Shop</h5>
          <div className="rd-footer-links">
            {cats.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.alias}/${cat.id}`}>
                {cat.name}
              </Link>
            ))}
            <Link href="/new-arrival">New Arrivals</Link>
          </div>
        </div>

        <div>
          <h5>Company</h5>
          <div className="rd-footer-links">
            {links1.map((l) => (
              <Link key={l.alias} href={l.url}>
                {l.alias.trim()}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h5>Get in touch</h5>
          <ul className="rd-footer-contact">
            <li>
              <FiPhoneCall size={15} />
              <a href="tel:+13178039060">+1 (317) 803-9060</a>
            </li>
            <li>
              <MdOutlineMail size={16} />
              <a href="mailto:sales@mbwholesalellc.com">
                sales@mbwholesalellc.com
              </a>
            </li>
            <li>
              <IoLocationOutline size={16} />
              <span>Indianapolis, IN — Cash & Carry warehouse</span>
            </li>
          </ul>
          <h5 style={{ marginTop: 26 }}>Account</h5>
          <div className="rd-footer-links">
            {links2.map((l) => (
              <Link key={l.alias} href={l.url}>
                {l.alias.trim()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="rd-footer-bottom">
        <div className="rd-wrap">
          <span>
            © {new Date().getFullYear()} {store?.name || "MB Wholesale"} · All
            rights reserved
          </span>
          <span className="rd-age-badge">21+ · Adults only</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
